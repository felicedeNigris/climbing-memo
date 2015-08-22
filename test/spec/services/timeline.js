'use strict'

describe('Service: timelineSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var timelineSvc
  beforeEach(inject(function(_timelineSvc_) {
    timelineSvc = _timelineSvc_
  }))

  describe('#processData(data)', function() {
    it('should output a nested array', function() {
      var inputArray = [
        {
          "date":      "08/18/2015", "grade":      "5.14a",
          "location":  "Jamestown, CA", "sector":  "Jailhouse"
        },
        {
          "date":      "08/02/2015", "grade":      "5.12c",
          "location":  "Jamestown, CA", "sector":  "Goldwall"
        },
        {
          "date":      "08/11/2015", "grade":      "5.11a",
          "location":  "Jamestown, CA", "sector":  "Goldwall"
        },
        {
          "date":      "07/08/2015", "grade":             "V7",
          "location":  "Dogpatch Boulers, SF", "sector":  "Dogpatch"
        },
        {
          "date":      "07/20/2015", "grade":             "V6",
          "location":  "Dogpatch Boulers, SF", "sector":  "Dogpatch"
        }
      ]
      var outputArray = [
        {
          "isIndoor": false,
          "content": {
            "areaLocation": "Jamestown, CA",
            "sectors": [
              [
                {
                  "date":      "08/18/2015", "grade":      "5.14a",
                  "location":  "Jamestown, CA", "sector":  "Jailhouse"
                }
              ],
              [
                {
                  "date":      "08/11/2015", "grade":      "5.11a",
                  "location":  "Jamestown, CA", "sector":  "Goldwall"
                },
                {
                  "date":      "08/02/2015", "grade":      "5.12c",
                  "location":  "Jamestown, CA", "sector":  "Goldwall"
                }
              ]
            ],
            "start": "08/18/2015",
            "end": "08/02/2015"
          }
        },
        {
          "isIndoor": false,
          "content": {
            "areaLocation": "Dogpatch Boulers, SF",
            "sectors": [
              [
                {
                  "date":      "07/20/2015", "grade":             "V6",
                  "location":  "Dogpatch Boulers, SF", "sector":  "Dogpatch"
                },
                {
                  "date":      "07/08/2015", "grade":             "V7",
                  "location":  "Dogpatch Boulers, SF", "sector":  "Dogpatch"
                }
              ]
            ],
            "start": "07/20/2015",
            "end": "07/08/2015"
          }
        }
      ]

      var result = timelineSvc.processData(inputArray)

      expect(JSON.stringify(result) === JSON.stringify(outputArray)).toBe(true)
    })
  })

})
