# Gomindz Inventory App Backend

## Get Started On Windows

```
git clone {the url to the GitHub repo}
```

```
cd ..
pip install virtualenv ...In case you do not have Virtual Env not installed
python -m venv inventoryapp_env
```

```
inventoryapp_env/Scripts/activate
deactivate  ... To deactivate the Virtual Env
```

```diff
- Add the virtual environment path to VSCode in case you are using VSCode
+ This can be found in View, Command Palette, Search for python Interpreter.
! Then add the Path here.
@@  @@
```

```
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
Create Super User
python manage.py createsuperuser
python manage.py runserver
```


## Get Started On IOS

```
git clone {the url to the GitHub repo}
```

```
cd ..
python3 -m venv venv
source venv/bin/activate
```

```diff
- Add the virtual environment path to VSCode in case you are using VSCode
+ This can be found in View, Command Palette, Search for python Interpreter.
! Then add the Path here.
@@  @@
```

```diff
- Comment Out The Mysqlclient & psycopg2 before installing.
```

```
pip install -r requirements.txt
python manage.py migrate
Create Super User
python manage.py createsuperuser
python manage.py runserver
```







# Gomindz Inventory App Frontend

## Get Started

```diff
+ git clone {the url to the GitHub repo}
```

```
cd inv-frontend
```

```diff
npm install --legacy-peer-deps
```

```diff
npm fund
```

```diff
npm start
```
