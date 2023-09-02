# feynman-technique-scraper
A simple and fast scraper for collection sentences as list

## Requirements

- Node.js
- WSL/Linux

## Usage

### Start service
``` powershell
    node app.js
```

### Run scraper to collect words from many links

*Request http://localhost:6000/scrap/many
``` json
{
    "links": [
        "https://bajkowytata.com/krowka-mutka/",
        "https://miastodzieci.pl/bajki/motyle/"
    ]
}
```

## Run scraper from terminal

``` powershell
    node input_file link filename
```

example
``` powershell
    node input.js "https://www.superkid.pl/dzieci-dzieciom-bajka-o-smoku-i-krolewnie" ./test.txt
```

