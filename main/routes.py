from flask import Blueprint, render_template, flash

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('store.html')