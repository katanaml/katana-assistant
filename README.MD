# Katana Assistant

Machine Learning based agent, helps to enable business automation.

Technology: TensorFlow, Keras, Flask, Python, Node.js, JavaScript

Author: Katana, Red Samurai Consulting, Andrejus Baranovskis

## Instructions

#### - Machine Learning

Install TensorFlow

```
pip install tensorflow
```

Install Keras

```
pip install keras
```

Model code is located in mlmodels folder.

Sample set of intents is available in the file mlmodels/intents.json. There is pre-built model in mlmodels/katana-assistant-model.pkl. If you want to rebuild model - run Jupyter notebook katana-assistant-model.ipynb

To start Katana assistant model endpoint in the background process run it with PM2 manager:

```
pm2 start katana-assistant-endpoint.py
```

This will start endpoint on port 5001

#### - Node.js Backend

Backend code is located in mlbackend folder.

Run backend with PM2 manager on port 3000:

```
PORT=3000 pm2 start -l 0 ./bin/www
```

Socket.IO endpoint will be started on port 8000. Check mlbackend/routes/assistant.js

#### - JavaScript Frontend

Frontend code is located in mlfrontend folder.

UI client is implemented with [Oracle JET](https://www.oracle.com/webfolder/technetwork/jet/index.html). Follow instructions to install Oracle JET.

Navigate to folder mlfrontend/socketiojet and run this command to setup required libraries:

```
ojet restore
```

Run UI client:

```
ojet --server-port=8010 serve
```

This will start frontend on port 8010.

## License

Licensed under the Apache License, Version 2.0. Copyright 2019 Red Samurai Consulting. [Copy of the license](https://github.com/katanaml/katana-assistant/blob/master/LICENSE).
