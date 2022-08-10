# InventoryApp


Clone The Entire Project

- git clone {the url to the GitHub repo}

# Frontend React JS

Getting Started

- cd frontend
- npm install
- npm start



# Backend Djnago - Windows Setup

Getting Started

- cd backend

Create Virtual Environment

- pipenv install django 

    This will create a virtual environment and install django within that virtual environment
 
- Activate the virtual environment

  Activating the virtual environment in our command prompt. This allows us to run the python intepreter inside the
  virtual environment not the one installed globally.
 
  : pipenv shell
  
- Configure VSCode to use the python intepreter inside our virtual environment

  : In VSCode, View -> Command Palette -> Search for python intepreter
  : Get The Path to our virtual environment : $ pipenv --venv
  : Copy the path and paste in the vscode python intepreter path and append \bin\python


- Install Requirements File

  : pip install -r requirements.txt

- Migrate Database

  : python manage.py migrate

- Create Super User

  : python manage.py createsuperuser

- Run Project

  : python manage.py runserver
  
  

# Backend Djnago - IOS Setup

Go To Project Directory

- cd backend

Create Virtual Environment

- python3 -m venv venv

Active Virtual Environment

- source venv/bin/activate

- Install Requirements File

pip install -r requirements.txt

Migrate Database

- python manage.py migrate

Create Super User

- python manage.py createsuperuser

Run Project

- python manage.py runserver
