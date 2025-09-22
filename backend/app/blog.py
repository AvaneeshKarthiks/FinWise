# app/blog_routes.py
from flask import Blueprint, request, jsonify
from mysql.connector import Error
from app.utils import get_db_connection   # adjust if your DB helper module name is different

blog_bp = Blueprint("blog_bp", __name__)

@blog_bp.route("/", methods=["POST"])
def create_blog():
    """
    Create a blog.
    Expects JSON:
    {
      "title": "My post",
      "slug": "my-post",
      "content": "long content...",
      "image_url": "https://cdn/...",
      "image_alt": "alt text",
      "image_caption": "caption",
      "author_id": 1   # optional
    }
    """
    data = request.get_json() or {}
    title = data.get("title")
    slug = data.get("slug")
    content = data.get("content")
    image_url = data.get("image_url")
    image_alt = data.get("image_alt")
    image_caption = data.get("image_caption")
    author_id = data.get("author_id")

    if not title or not slug:
        return jsonify({"error": "title and slug are required"}), 400

    conn = get_db_connection()
    try:
        cur = conn.cursor()
        try:
            sql = """
                INSERT INTO blogs (title, slug, content, image_url, image_alt, image_caption, author_id)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            cur.execute(sql, (title, slug, content, image_url, image_alt, image_caption, author_id))
            blog_id = cur.lastrowid
            # ensure commit in case autocommit is off
            try:
                conn.commit()
            except Exception:
                pass

            return jsonify({
                "message": "blog created",
                "blog_id": blog_id
            }), 201
        except Error as e:
            # Duplicate slug / unique constraint error in MySQL has errno 1062
            if getattr(e, "errno", None) == 1062:
                return jsonify({"error": "slug already exists"}), 409
            return jsonify({"error": str(e)}), 500
        finally:
            cur.close()
    except Exception as e:
        return jsonify({"error": "db connection error", "details": str(e)}), 500


@blog_bp.route("/<int:blog_id>", methods=["PUT", "PATCH"])
def update_blog(blog_id):
    """
    Partial update a blog. Provide any subset of fields in JSON:
    title, slug, content, image_url, image_alt, image_caption, author_id
    """
    data = request.get_json() or {}
    allowed_fields = ["title", "slug", "content", "image_url", "image_alt", "image_caption", "author_id"]
    updates = []
    params = []

    for f in allowed_fields:
        if f in data:
            updates.append(f + " = %s")
            params.append(data.get(f))

    if not updates:
        return jsonify({"error": "no updatable fields provided"}), 400

    params.append(blog_id)
    sql = f"UPDATE blogs SET {', '.join(updates)} WHERE id = %s"

    conn = get_db_connection()
    try:
        cur = conn.cursor()
        try:
            cur.execute(sql, tuple(params))
            if cur.rowcount == 0:
                return jsonify({"error": "blog not found"}), 404
            try:
                conn.commit()
            except Exception:
                pass
            return jsonify({"message": "blog updated", "blog_id": blog_id}), 200
        except Error as e:
            if getattr(e, "errno", None) == 1062:
                return jsonify({"error": "slug already exists"}), 409
            return jsonify({"error": str(e)}), 500
        finally:
            cur.close()
    except Exception as e:
        return jsonify({"error": "db connection error", "details": str(e)}), 500


@blog_bp.route("/<int:blog_id>", methods=["DELETE"])
def delete_blog(blog_id):
    """
    Delete a blog by id.
    """
    conn = get_db_connection()
    try:
        cur = conn.cursor()
        try:
            cur.execute("DELETE FROM blogs WHERE id = %s", (blog_id,))
            if cur.rowcount == 0:
                return jsonify({"error": "blog not found"}), 404
            try:
                conn.commit()
            except Exception:
                pass
            return jsonify({"message": "blog deleted", "blog_id": blog_id}), 200
        except Error as e:
            return jsonify({"error": str(e)}), 500
        finally:
            cur.close()
    except Exception as e:
        return jsonify({"error": "db connection error", "details": str(e)}), 500
