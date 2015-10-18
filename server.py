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

app.config['MAX_CONTENT_LENGTH'] = 50*1024*1024*1024
# This is the path to the upload directory
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['MIME_MAPPING'] = {'text/html': 'application/vnd.google-apps.document', 'text/plain': 'application/vnd.google-apps.document',
                                'application/rtf': 'application/vnd.google-apps.document',
                                'application/vnd.oasis.opendocument.text': 'application/vnd.google-apps.document',
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'application/vnd.google-apps.document',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'application/vnd.google-apps.spreadsheet',
                                'application/x-vnd.oasis.opendocument.spreadsheet': 'application/vnd.google-apps.spreadsheet',
                                'text/csv': 'application/vnd.google-apps.spreadsheet',
                                'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'application/vnd.google-apps.presentation'
                                }
app.config['DRIVE_INSTANCE'] = None

# This route will show a form to perform an AJAX request
# jQuery is loaded to execute the request and update the
# value of the operation
@app.route('/')
def index():
    return render_template('index.html')

def auth():
    global drive
    

# Route that will process the file upload
@app.route('/upload', methods=['POST'])
def upload():
    print 'yo'
    # Get the name of the uploaded file
    file = request.files['file']
    redirectUrl = request.form['redirectUrl']
    print file
    ## THIS IS WHERE RICHARD'S CODE GOES

    if not app.config['DRIVE_INSTANCE']:
        gauth = GoogleAuth()
        gauth.LocalWebserverAuth()
        app.config['DRIVE_INSTANCE'] = GoogleDrive(gauth)

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
        print 'mime type!!!' + file.mimetype
        file1 = app.config['DRIVE_INSTANCE'].CreateFile({'title': 'graph', 'mimeType': app.config['MIME_MAPPING'][file.mimetype]})
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