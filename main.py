from flask import Flask, render_template, url_for
import os

video_path = []
for root, dirs, files in os.walk('static/videos'):
    for file in files:
        video_path.append("videos/" + file)

image_path = []
for root, dirs, files in os.walk('static/images'):
    for file in files:
        image_path.append("images/" + file)

app = Flask(__name__)
app.static_folder = 'static'

@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/playlist")
def videoPlaylist():
    return render_template("videoGallery.html", videoPaths=video_path)

@app.route("/photoGallery")
def photoGallery():
    return render_template("photoGallery.html", imagePaths=image_path)

if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)