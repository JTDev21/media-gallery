from flask import Flask, render_template, url_for, request, jsonify, make_response
import random
import time

from flask_jsglue import JSGlue
import os



yt_db = []
counter = 0
for root, dirs, files in os.walk('static/videos'):
    for file in files:
        title = file.split('.mp4')[0]
        yt_db.append(["videos/" + file, str(counter) + " | " + title, "Joshua Truong"])
        counter += 1



media_filepaths = []
media_ext_type = []
video_ext = ['m4v', 'avi', 'mpg', 'mp4']
img_ext = ['jpg', 'gif', 'bmp', 'png']

for root, dirs, files in os.walk('static/media_files'):
    for file in files:
        media_filepaths.append("media_files/" + file)
        media_ext = (file.split('.'))[-1]
        for ext in video_ext:
            if (media_ext == ext):
                media_ext_type.append('video')
        for ext in img_ext:
            if (media_ext == ext):
                media_ext_type.append('image')


app = Flask(__name__)
app.static_folder = 'static'
_jsglue = JSGlue(app)



@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/playlist")
def videoPlaylist():
    return render_template("youtubeVideos.html")

@app.route("/masonaryGallery.html")
def photoGallery():
    return render_template("masonaryGallery.html", jsglue=_jsglue, mediaFiles=media_filepaths, mediaEXT=media_ext_type)

# ---------------------------------------------------------------------------------------------------------------------
posts = len(yt_db)  # num posts to generate
quantity = 15  # num posts to return per request


@app.route("/load-yt")
def load_yt_items():
    """ Route to return the posts """

    time.sleep(0.2)  # Used to simulate delay

    if request.args:
        counter = int(request.args.get("c"))  # The 'counter' value sent in the QS

        if counter == 0:
            print(f"Returning posts 0 to {quantity}")
            # Slice 0 -> quantity from the db
            res = make_response(jsonify(yt_db[0: quantity]), 200)

        elif counter == posts:
            print("No more posts")
            res = make_response(jsonify({}), 200)

        else:
            print(f"Returning posts {counter} to {counter + quantity}")
            # Slice counter -> quantity from the db
            res = make_response(jsonify(yt_db[counter: counter + quantity]), 200)

    return res


if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
