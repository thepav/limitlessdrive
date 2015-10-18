import os
# We'll render HTML templates and access data sent by POST
# using the request object from flask. Redirect and url_for
# will be used to redirect the user once the upload is done
# and send_from_directory will help us to send/show on the
# browser the file that the user just uploaded
from flask import Flask, render_template, request, redirect, url_for, send_from_directory
from werkzeug import secure_filename
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from pydrive.files import ApiRequestError

# Initialize the Flask application
app = Flask(__name__)

# This is the path to the upload directory
app.config['UPLOAD_FOLDER'] = 'uploads/'
# These are the extension that we are accepting to be uploaded
app.config['ALLOWED_EXTENSIONS'] = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

# For a given file, return whether it's an allowed type or not
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

# This route will show a form to perform an AJAX request
# jQuery is loaded to execute the request and update the
# value of the operation
@app.route('/')
def index():
    return render_template('index.html')

def auth():
    global drive
    gauth = GoogleAuth()
    gauth.LocalWebserverAuth()
    drive = GoogleDrive(gauth)

# Route that will process the file upload
@app.route('/upload', methods=['POST'])
def upload():
    print 'yo'
    # Get the name of the uploaded file
    file = request.files['file']
    redirectUrl = request.form['redirectUrl']
    print file
    ## THIS IS WHERE RICHARD'S CODE GOES

    global drive
    try:
        if not drive:
            auth()
    except:
        auth()

    # Check if the file is one of the allowed types/extensions
    if file: #and allowed_file(file.filename):
        # Make the filename safe, remove unsupported chars
        filename = secure_filename(file.filename)
        # Move the file form the temporal folder to
        # the upload folder we setup
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # Redirect the user to the uploaded_file route, which
        # will basicaly show on the browser the uploaded file
        # return redirect(url_for('uploaded_file',
        #                         filename=filename))
        print filename

        # upload works
        file1 = drive.CreateFile({'title': 'graph', 'mimeType': 'application/vnd.google-apps.document'})
        file1.Upload()
        file1.SetContentFile(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file1.Upload()
        return redirect(redirectUrl)

@app.route('/uploadencoded', methods=['POST'])
def uploadEncoded():
    print 'yo'
    # Get the name of the uploaded file
    file = request.form['file']
    redirectUrl = request.form['redirectUrl']
    filename = request.form['filename']
    #print file

    global drive
    try:
        if not drive:
            auth()
    except:
        auth()

    # Check if the file is one of the allowed types/extensions
    if file: #and allowed_file(file.filename):
        f = open(os.path.join(app.config['UPLOAD_FOLDER'], filename),'w')
        f.write(file)
        file = f
        print filename

        # upload works
        file1 = drive.CreateFile({'title': 'encoded', 'mimeType': 'application/vnd.google-apps.document'})
        file1.Upload()
        file1.SetContentFile(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        file1.Upload()
        return redirect(redirectUrl)


# This route is expecting a parameter containing the name
# of a file. Then it will locate that file on the upload
# directory and show it on the browser, so if the user uploads
# an image, that image is going to be show after the upload
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

if __name__ == '__main__':
    global drive

    app.run(
        port=int("8080"),
        debug=True,
        ssl_context='adhoc'
    )