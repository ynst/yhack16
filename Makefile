
all: scraper geocode

scraper: school_scraper.py
	rm -f scraper *.pyc
	dos2unix school_scraper.py
	chmod +x school_scraper.py
	link ./school_scraper.py scraper

geocode: geocode.py
	rm -f geocode *.pyc
	dos2unix geocode.py
	chmod +x geocode.py
	link ./geocode.py geocode

# make the full dataset
dataset: scraper
	csvcut -c 2 cache/school_ids.csv | parallel --progress ./scraper {} > cache/bios.csv

# skip first row
# modify in future to return -1 if the arcgis call stalls. wait 2 seconds before
# retrying.
# in doing the aggregation: nevada stays out 2014, kansas missed in 2013
geodata: geocode
	tail phone5 -n +1 | csvcut -c 4 | parallel --progress ./geocode {} > cache/geocodes.csv

geomini: geocode
	tail phone5 | csvcut -c 4 -q \" | parallel -q --progress ./geocode {} > cache/geocodes.csv

sMini: geomini
	less ./cache/geocodes.csv

geocmd: 
	tail phone5 | csvcut -c 4 parallel --progress --bibtex geocode {} --provider arcgis 


# convert the phones file
convertPhone:
	iconv -f utf8 -t ascii cache/phone2 > cache/phone3

archive:
	tar -czvf bios.csv.tar.gz ./cache/bios.csv

clean:
	rm -f *.pyc scraper geocode

# stripping of special chars
# cat phone2 |perl -ne's/[\x7F-\xFF]+/ /sgi;print' > phone4