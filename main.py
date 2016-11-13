from flask import Flask, render_template, url_for

app = Flask(__name__)


@app.route("/")
def main():
    return render_template('index.html')

@app.route("/choropleth")
def choropleth():
    return render_template('choropleth.html')

if __name__ == "__main__":
	# This is used when running on localhost
    app.run()