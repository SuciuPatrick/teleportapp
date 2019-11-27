from project import create_app

application = app = create_app()

if __name__ == '__main__':
    application.run(debug=True)