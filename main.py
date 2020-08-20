from flask import Flask, render_template, url_for
from flask_jsglue import JSGlue
import os



video_path = []
for root, dirs, files in os.walk('static/videos'):
    for file in files:
        video_path.append("videos/" + file)

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

# print(media_filepaths)
# print("media_filepaths", len(media_filepaths))
# print("media_ext_type", len(media_ext_type))

app = Flask(__name__)
app.static_folder = 'static'
_jsglue = JSGlue(app)



@app.route("/")
@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/playlist")
def videoPlaylist():
    return render_template("youtubeVideos.html", videoPaths=video_path)

@app.route("/masonaryGallery.html")
def photoGallery():
    return render_template("masonaryGallery.html", jsglue=_jsglue, mediaFiles=media_filepaths, mediaEXT=media_ext_type)

if __name__ == "__main__":
    app.run(host="localhost", port=8000, debug=True)
