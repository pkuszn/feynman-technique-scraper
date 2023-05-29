# feynman-technique-scraper
A simple and fast scraper for collection sentences as list

## Usage

### Run scraper to collect words from one link


*Request http://localhost:6000/scrap/scrap-one*
``` json
{
    "link": "https://bajkowytata.com/krowka-mutka/"
}
```

### Run scraper to collect words from many links

*Request http://localhost:6000/scrap/scrap-many*
``` json
{
    "links": [
        "https://bajkowytata.com/krowka-mutka/",
        "https://miastodzieci.pl/bajki/motyle/"
    ]
}
```

## Run scraper from cli

``` powershell
    node input_file link filename
```

example
``` powershell
    node input.js "https://www.superkid.pl/dzieci-dzieciom-bajka-o-smoku-i-krolewnie" ./test.txt
```

