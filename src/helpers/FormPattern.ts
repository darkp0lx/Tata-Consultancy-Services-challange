export class FormPattern {
    get pattern() {
      return {
        email: "^.+@[^\\.].*\\.[a-zA-Z]{2,}$",
        decimal: "[0-9]+(\.[0-9][0-9]?)?",
        date: "^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$",
      }
    }
  }
  