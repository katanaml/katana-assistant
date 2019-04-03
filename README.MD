# Katana Assistant

Machine Learning based agent, helps to enable business automation.

Technology: TensorFlow, Keras, Flask, Python, Node.js, JavaScript

Author: Katana, Red Samurai Consulting, Andrejus Baranovskis

## Instructions

#### Machine Learning

Install TensorFlow

```
pip install tensorflow
```

Install Keras

```
pip install keras
```

Sample set of intents is available in the file mlmodels/intents.json. There is pre-built model in mlmodels/katana-assistant-model.pkl. If you want to rebuild model - run Jupyter notebook katana-assistant-model.ipynb

To start Katana assistant model endpoint in the background process run it with PM2:

```
pm2 start katana-assistant-endpoint.py
```

This will start endpoint on port 5001

#### Node.js Backend

#### UI Client

## License

Licensed under the Apache License, Version 2.0. Copyright 2019 Red Samurai Consulting. [Copy of the license](https://github.com/katanaml/katana-assistant/blob/master/LICENSE).
