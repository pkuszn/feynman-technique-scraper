# feynman-technique-scraper

Use the scraper service to collect words from given websites. The app connects with other services to determine the part of speech of collected text, then sentences are entered into the database using the REST API service.

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

example of saving output to file
``` powershell
    node input.js "https://www.superkid.pl/dzieci-dzieciom-bajka-o-smoku-i-krolewnie" ./test.txt
```

