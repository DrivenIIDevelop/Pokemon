from src.account_app import app
from dotenv import load_dotenv
from pathlib import Path
from os import getenv

MODE = getenv('MODE', 'development')
dotenv_path = Path('../.env.' + MODE)
load_dotenv(dotenv_path=dotenv_path)

f_debug = True # global flag for debugging

def main():
	app.run(
		debug=f_debug,
		host=getenv('VITE_API_HOST'),
		port=getenv('VITE_API_PORT')
	)
	

if __name__ == "__main__":
	main()