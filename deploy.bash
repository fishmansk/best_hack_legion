git clone https://github.com/ichega/best_hack_legion.git
cd best_hack_legion
pip3 install virtualenv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd bh_site
exec python manage.py runserver 127.0.0.1:8901	
