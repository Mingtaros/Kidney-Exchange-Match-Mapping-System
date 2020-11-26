blood_type_match = {
  # row: donor blood type
  # column: recipient blood type
  "O" : {"O": 1, "A": 1, "B": 1, "AB": 1},
  "A" : {"O": 0, "A": 1, "B": 0, "AB": 1},
  "B" : {"O": 0, "A": 0, "B": 1, "AB": 1},
  "AB": {"O": 0, "A": 0, "B": 0, "AB": 1}
}

NO_TYPE = "-"