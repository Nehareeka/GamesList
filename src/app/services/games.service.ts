import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IGame } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private _gameUrl = '../../assets/games.csv';
  private gamesList: IGame[];
  getGamesList() {
    return this.gamesList;
  }

  setGamesList(list: IGame[]) {
    this.gamesList = list;
  }

  constructor(private _http: HttpClient) { }
  getGames() {
    return this._http.get(this._gameUrl, {'responseType': 'text'})
    .pipe(map((data) => {
      var arrayData = this.CSVToArray(data, ",");
      this.setGamesList(this.csvJSON(arrayData));
      return this.getGamesList();
  }));
  }

  public csvJSON(csv) {
    var result = [];
    var headers = [];
    csv[0].forEach(h => {
        headers.push(h.replace(/ /g, ""));
    });
    for (var i = 1; i < csv.length - 1; i++) {
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = csv[i][j];
        }
        result.push(obj);
    }
    return result;
}

// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter !== strDelimiter)
        ) {
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);
        }
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        if (strMatchedValue !== "") {
          arrData[arrData.length - 1].push(strMatchedValue);
        }
    }
    // Return the parsed data.
    return (arrData);
}
}
