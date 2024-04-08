from account_app import app

f_debug = True # global flag for debugging

def main():
	app.run(
		debug=f_debug,
		host="0.0.0.0",
		port=5000
	)
	

if __name__ == "__main__":
	main()