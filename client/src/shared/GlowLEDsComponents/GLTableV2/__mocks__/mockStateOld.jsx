/* eslint-disable max-lines */
import { tagKeyMatchFull } from "covalent/MaterialUI/TagInput/tagRegex";
import React from "react";

const props = {
  glTable: {
    rows: [
      {
        context: "alesley",
        tag_names: ["alesleyvalue"],
        locations: ["6535 - Location 1", "Charlotte"]
      },
      {
        context: "archive56401",
        tag_names: ["archive56401-1", "archive56401-2", "archive56401-3"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "ACSC", "API Neg location", "Asheville", "Columbus"]
      },
      {
        context: "atag",
        tag_names: ["1"],
        locations: ["6535 - Location 1", "Columbus"]
      },
      {
        context: "atag2",
        tag_names: ["a", "b", "c"],
        locations: ["ACSC", "Asheville", "Charlotte", "Columbus"]
      },
      {
        context: "char",
        tag_names: ["123tag_name-123#", "asdfgh", "qwerty", "zxcvbn"],
        locations: ["Charlotte", "Columbus", "Elkhart", "London"]
      },
      {
        context: "co3841",
        tag_names: ["tag2", "tag3"],
        locations: ["Charlotte", "Columbus"]
      },
      {
        context: "co3887removed",
        tag_names: ["sdfddsf", "sdg", "tag1"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "ACSC", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "co66661",
        tag_names: ["value1"],
        locations: ["Asheville", "Columbus"]
      },
      {
        context: "co7028",
        tag_names: ["test"],
        locations: ["Columbus"]
      },
      {
        context: "createdonobjectivemap",
        tag_names: ["1", "2", "archive56401-3"],
        locations: ["Asheville", "Charlotte", "Columbus"]
      },
      {
        context: "dsgdfgfdg",
        tag_names: ["df", "g"],
        locations: ["ACSC", "Charlotte"]
      },
      {
        context: "evaltest1",
        tag_names: ["evaltest1"],
        locations: ["6535 - Location 1"]
      },
      {
        context: "expiration356days",
        tag_names: ["expiration365-1", "expiration365-2", "expiration365-3"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "expiration720days",
        tag_names: ["exp720-1", "exp720-1-3", "exp720-2"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "ACSC", "Asheville", "Charlotte", "Columbus"]
      },
      {
        context: "group",
        tag_names: ["group_a", "group_b", "group_c"],
        locations: ["Asheville", "Charlotte", "Columbus", "Rome"]
      },
      {
        context: "jobcode",
        tag_names: ["archive56401-1", "archive56401-2", "archive56401-3"],
        locations: ["Asheville", "Charlotte", "Columbus", "LA"]
      },
      {
        context: "jobid",
        tag_names: ["001"],
        locations: ["LA"]
      },
      {
        context: "key0222",
        tag_names: ["k3", "key0222value1"],
        locations: ["Charlotte", "Elkhart"]
      },
      {
        context: "key0404",
        tag_names: ["key0404value1", "key0404value2"],
        locations: ["Charlotte", "Elkhart"]
      },
      {
        context: "key29861",
        tag_names: ["key29861-1"],
        locations: ["ACSC"]
      },
      {
        context: "newtag1",
        tag_names: ["newtag1-2"],
        locations: ["ACSC", "Columbus"]
      },
      {
        context: "newtagnoselect",
        tag_names: ["newtagnoselect-1", "newtagnoselect-2"],
        locations: ["ACSC", "Asheville"]
      },
      {
        context: "qwwretreyre",
        tag_names: ["#test", "+#-_."],
        locations: ["ACSC", "Charlotte"]
      },
      {
        context: "slava",
        tag_names: ["slavatag1"],
        locations: ["Asheville", "Columbus"]
      },
      {
        context: "sprintreview",
        tag_names: ["value1", "value2"],
        locations: ["ACSC", "Asheville", "Charlotte", "Columbus"]
      },
      {
        context: "svitlana",
        tag_names: ["sk3"],
        locations: ["Columbus"]
      },
      {
        context: "svitlana2",
        tag_names: ["sk-3"],
        locations: ["Columbus"]
      },
      {
        context: "tag1",
        tag_names: ["tag1-a", "tag1-b"],
        locations: ["Columbus", "Elkhart"]
      },
      {
        context: "tag101011",
        tag_names: ["tag101011-3"],
        locations: ["Charlotte"]
      },
      {
        context: "tag111",
        tag_names: ["archive56401-3", "tag111-1", "tag111-2", "tag111-3"],
        locations: ["Columbus", "Elkhart", "LA", "Newton", "Rome"]
      },
      {
        context: "tag12821",
        tag_names: ["tag12821-1", "tag12821-2"],
        locations: ["Columbus", "Manchester", "New York"]
      },
      {
        context: "tag2",
        tag_names: ["archive56401-3", "tag2key1", "tag2key2"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "tag3673obj1",
        tag_names: ["tag3673obj1-3"],
        locations: ["Elkhart"]
      },
      {
        context: "tag4556removed",
        tag_names: ["archive56401-3", "bb"],
        locations: ["Charlotte", "Columbus"]
      },
      {
        context: "tag50051",
        tag_names: ["tag50051-100"],
        locations: ["Asheville", "Columbus"]
      },
      {
        context: "tag5268employee",
        tag_names: ["tag5268employee-1", "tag5268employee-2"],
        locations: ["Asheville", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "tag5690certbuilder",
        tag_names: ["c1", "c2"],
        locations: ["Columbus", "Elkhart"]
      },
      {
        context: "tag5690editempl",
        tag_names: ["b1", "b2"],
        locations: ["Columbus", "Elkhart"]
      },
      {
        context: "tag5690editemplonetoapply",
        tag_names: ["100", "1000", "10000", "200", "2000"],
        locations: [
          "6535 - Location 1",
          "6535 - Location 2",
          "6535 - Location 3",
          "6535 - Location 4",
          "6535 - Location 5",
          "ACSC",
          "Asheville",
          "Charlotte",
          "Columbus",
          "Elkhart"
        ]
      },
      {
        context: "tag5690objmap",
        tag_names: ["a1", "a2", "a3", "a4", "a5"],
        locations: ["Charlotte", "Columbus", "Elkhart", "LA", "Rome"]
      },
      {
        context: "tag5889",
        tag_names: ["evaluator"],
        locations: ["Columbus"]
      },
      {
        context: "tag5986fix",
        tag_names: ["tag5986fix-1"],
        locations: ["Charlotte"]
      },
      {
        context: "tag6460",
        tag_names: ["tag6460-1", "tag6460-10", "tag6460-2", "tag6460-3", "tag6460-4", "tag6460-5"],
        locations: ["ACSC", "Charlotte", "Columbus", "Elkhart", "LA", "London"]
      },
      {
        context: "tag64601",
        tag_names: ["tag64601-1", "tag64601-2", "tag64601-3"],
        locations: ["ACSC", "Charlotte", "Columbus"]
      },
      {
        context: "test",
        tag_names: ["gfdgfdgfd", "test"],
        locations: ["ACSC", "Asheville"]
      },
      {
        context: "test1",
        tag_names: ["test1ke3", "test1key2", "test1key5", "test1key9", "testkey1"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "6535 - Location 4", "6535 - Location 5", "Columbus"]
      },
      {
        context: "test11",
        tag_names: ["test11k1", "test11k2"],
        locations: ["Asheville", "Columbus"]
      },
      {
        context: "test1312",
        tag_names: ["1qwrt"],
        locations: ["Columbus"]
      },
      {
        context: "test20",
        tag_names: ["derpawhat", "test20k1", "test20k2", "test20k3"],
        locations: ["Asheville", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "test3",
        tag_names: ["test3key1", "test3key2", "test3key3"],
        locations: ["ACSC", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "test6",
        tag_names: ["a", "d"],
        locations: ["Elkhart", "New York"]
      },
      {
        context: "test7",
        tag_names: ["1"],
        locations: ["Elkhart"]
      },
      {
        context: "test9",
        tag_names: ["a", "d"],
        locations: ["Charlotte", "Elkhart"]
      },
      {
        context: "testak422",
        tag_names: ["1"],
        locations: ["Columbus"]
      },
      {
        context: "workstation",
        tag_names: ["value_should_not_be_removed"],
        locations: ["Columbus"]
      },
      {
        context: "ztag",
        tag_names: ["a"],
        locations: ["Columbus"]
      },
      {
        context: "zztop",
        tag_names: ["newesttagvalue", "newtagvalue"],
        locations: ["6535 - Location 1", "6535 - Location 2", "Columbus", "Elkhart", "Location-6531"]
      }
    ],
    permissions: [],
    filteredRows: [
      {
        context: "alesley",
        tag_names: ["alesleyvalue"],
        locations: ["6535 - Location 1", "Charlotte"]
      },
      {
        context: "archive56401",
        tag_names: ["archive56401-1", "archive56401-2", "archive56401-3"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "ACSC", "API Neg location", "Asheville", "Columbus"]
      },
      {
        context: "atag",
        tag_names: ["1"],
        locations: ["6535 - Location 1", "Columbus"]
      },
      {
        context: "atag2",
        tag_names: ["a", "b", "c"],
        locations: ["ACSC", "Asheville", "Charlotte", "Columbus"]
      },
      {
        context: "char",
        tag_names: ["123tag_name-123#", "asdfgh", "qwerty", "zxcvbn"],
        locations: ["Charlotte", "Columbus", "Elkhart", "London"]
      },
      {
        context: "co3841",
        tag_names: ["tag2", "tag3"],
        locations: ["Charlotte", "Columbus"]
      },
      {
        context: "co3887removed",
        tag_names: ["sdfddsf", "sdg", "tag1"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "ACSC", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "co66661",
        tag_names: ["value1"],
        locations: ["Asheville", "Columbus"]
      },
      {
        context: "co7028",
        tag_names: ["test"],
        locations: ["Columbus"]
      },
      {
        context: "createdonobjectivemap",
        tag_names: ["1", "2", "archive56401-3"],
        locations: ["Asheville", "Charlotte", "Columbus"]
      },
      {
        context: "dsgdfgfdg",
        tag_names: ["df", "g"],
        locations: ["ACSC", "Charlotte"]
      },
      {
        context: "evaltest1",
        tag_names: ["evaltest1"],
        locations: ["6535 - Location 1"]
      },
      {
        context: "expiration356days",
        tag_names: ["expiration365-1", "expiration365-2", "expiration365-3"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "expiration720days",
        tag_names: ["exp720-1", "exp720-1-3", "exp720-2"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "ACSC", "Asheville", "Charlotte", "Columbus"]
      },
      {
        context: "group",
        tag_names: ["group_a", "group_b", "group_c"],
        locations: ["Asheville", "Charlotte", "Columbus", "Rome"]
      },
      {
        context: "jobcode",
        tag_names: ["archive56401-1", "archive56401-2", "archive56401-3"],
        locations: ["Asheville", "Charlotte", "Columbus", "LA"]
      },
      {
        context: "jobid",
        tag_names: ["001"],
        locations: ["LA"]
      },
      {
        context: "key0222",
        tag_names: ["k3", "key0222value1"],
        locations: ["Charlotte", "Elkhart"]
      },
      {
        context: "key0404",
        tag_names: ["key0404value1", "key0404value2"],
        locations: ["Charlotte", "Elkhart"]
      },
      {
        context: "key29861",
        tag_names: ["key29861-1"],
        locations: ["ACSC"]
      },
      {
        context: "newtag1",
        tag_names: ["newtag1-2"],
        locations: ["ACSC", "Columbus"]
      },
      {
        context: "newtagnoselect",
        tag_names: ["newtagnoselect-1", "newtagnoselect-2"],
        locations: ["ACSC", "Asheville"]
      },
      {
        context: "qwwretreyre",
        tag_names: ["#test", "+#-_."],
        locations: ["ACSC", "Charlotte"]
      },
      {
        context: "slava",
        tag_names: ["slavatag1"],
        locations: ["Asheville", "Columbus"]
      },
      {
        context: "sprintreview",
        tag_names: ["value1", "value2"],
        locations: ["ACSC", "Asheville", "Charlotte", "Columbus"]
      },
      {
        context: "svitlana",
        tag_names: ["sk3"],
        locations: ["Columbus"]
      },
      {
        context: "svitlana2",
        tag_names: ["sk-3"],
        locations: ["Columbus"]
      },
      {
        context: "tag1",
        tag_names: ["tag1-a", "tag1-b"],
        locations: ["Columbus", "Elkhart"]
      },
      {
        context: "tag101011",
        tag_names: ["tag101011-3"],
        locations: ["Charlotte"]
      },
      {
        context: "tag111",
        tag_names: ["archive56401-3", "tag111-1", "tag111-2", "tag111-3"],
        locations: ["Columbus", "Elkhart", "LA", "Newton", "Rome"]
      },
      {
        context: "tag12821",
        tag_names: ["tag12821-1", "tag12821-2"],
        locations: ["Columbus", "Manchester", "New York"]
      },
      {
        context: "tag2",
        tag_names: ["archive56401-3", "tag2key1", "tag2key2"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "tag3673obj1",
        tag_names: ["tag3673obj1-3"],
        locations: ["Elkhart"]
      },
      {
        context: "tag4556removed",
        tag_names: ["archive56401-3", "bb"],
        locations: ["Charlotte", "Columbus"]
      },
      {
        context: "tag50051",
        tag_names: ["tag50051-100"],
        locations: ["Asheville", "Columbus"]
      },
      {
        context: "tag5268employee",
        tag_names: ["tag5268employee-1", "tag5268employee-2"],
        locations: ["Asheville", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "tag5690certbuilder",
        tag_names: ["c1", "c2"],
        locations: ["Columbus", "Elkhart"]
      },
      {
        context: "tag5690editempl",
        tag_names: ["b1", "b2"],
        locations: ["Columbus", "Elkhart"]
      },
      {
        context: "tag5690editemplonetoapply",
        tag_names: ["100", "1000", "10000", "200", "2000"],
        locations: [
          "6535 - Location 1",
          "6535 - Location 2",
          "6535 - Location 3",
          "6535 - Location 4",
          "6535 - Location 5",
          "ACSC",
          "Asheville",
          "Charlotte",
          "Columbus",
          "Elkhart"
        ]
      },
      {
        context: "tag5690objmap",
        tag_names: ["a1", "a2", "a3", "a4", "a5"],
        locations: ["Charlotte", "Columbus", "Elkhart", "LA", "Rome"]
      },
      {
        context: "tag5889",
        tag_names: ["evaluator"],
        locations: ["Columbus"]
      },
      {
        context: "tag5986fix",
        tag_names: ["tag5986fix-1"],
        locations: ["Charlotte"]
      },
      {
        context: "tag6460",
        tag_names: ["tag6460-1", "tag6460-10", "tag6460-2", "tag6460-3", "tag6460-4", "tag6460-5"],
        locations: ["ACSC", "Charlotte", "Columbus", "Elkhart", "LA", "London"]
      },
      {
        context: "tag64601",
        tag_names: ["tag64601-1", "tag64601-2", "tag64601-3"],
        locations: ["ACSC", "Charlotte", "Columbus"]
      },
      {
        context: "test",
        tag_names: ["gfdgfdgfd", "test"],
        locations: ["ACSC", "Asheville"]
      },
      {
        context: "test1",
        tag_names: ["test1ke3", "test1key2", "test1key5", "test1key9", "testkey1"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "6535 - Location 4", "6535 - Location 5", "Columbus"]
      },
      {
        context: "test11",
        tag_names: ["test11k1", "test11k2"],
        locations: ["Asheville", "Columbus"]
      },
      {
        context: "test1312",
        tag_names: ["1qwrt"],
        locations: ["Columbus"]
      },
      {
        context: "test20",
        tag_names: ["derpawhat", "test20k1", "test20k2", "test20k3"],
        locations: ["Asheville", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "test3",
        tag_names: ["test3key1", "test3key2", "test3key3"],
        locations: ["ACSC", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "test6",
        tag_names: ["a", "d"],
        locations: ["Elkhart", "New York"]
      },
      {
        context: "test7",
        tag_names: ["1"],
        locations: ["Elkhart"]
      },
      {
        context: "test9",
        tag_names: ["a", "d"],
        locations: ["Charlotte", "Elkhart"]
      },
      {
        context: "testak422",
        tag_names: ["1"],
        locations: ["Columbus"]
      },
      {
        context: "workstation",
        tag_names: ["value_should_not_be_removed"],
        locations: ["Columbus"]
      },
      {
        context: "ztag",
        tag_names: ["a"],
        locations: ["Columbus"]
      },
      {
        context: "zztop",
        tag_names: ["newesttagvalue", "newtagvalue"],
        locations: ["6535 - Location 1", "6535 - Location 2", "Columbus", "Elkhart", "Location-6531"]
      }
    ],
    visibleRows: [
      {
        context: "alesley",
        tag_names: ["alesleyvalue"],
        locations: ["6535 - Location 1", "Charlotte"]
      },
      {
        context: "archive56401",
        tag_names: ["archive56401-1", "archive56401-2", "archive56401-3"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "ACSC", "API Neg location", "Asheville", "Columbus"]
      },
      {
        context: "atag",
        tag_names: ["1"],
        locations: ["6535 - Location 1", "Columbus"]
      },
      {
        context: "atag2",
        tag_names: ["a", "b", "c"],
        locations: ["ACSC", "Asheville", "Charlotte", "Columbus"]
      },
      {
        context: "char",
        tag_names: ["123tag_name-123#", "asdfgh", "qwerty", "zxcvbn"],
        locations: ["Charlotte", "Columbus", "Elkhart", "London"]
      },
      {
        context: "co3841",
        tag_names: ["tag2", "tag3"],
        locations: ["Charlotte", "Columbus"]
      },
      {
        context: "co3887removed",
        tag_names: ["sdfddsf", "sdg", "tag1"],
        locations: ["6535 - Location 1", "6535 - Location 2", "6535 - Location 3", "ACSC", "Charlotte", "Columbus", "Elkhart"]
      },
      {
        context: "co66661",
        tag_names: ["value1"],
        locations: ["Asheville", "Columbus"]
      },
      {
        context: "co7028",
        tag_names: ["test"],
        locations: ["Columbus"]
      },
      {
        context: "createdonobjectivemap",
        tag_names: ["1", "2", "archive56401-3"],
        locations: ["Asheville", "Charlotte", "Columbus"]
      }
    ],
    selectedRows: [],
    sorting: [0, "asc"],
    page: 0,
    pageSize: 10,
    availableFilters: {},
    availableFiltersProp: {
      locations: [
        "6535 - Location 1",
        "Charlotte",
        "6535 - Location 2",
        "6535 - Location 3",
        "ACSC",
        "API Neg location",
        "Asheville",
        "Columbus",
        "Elkhart",
        "London",
        "Rome",
        "LA",
        "Newton",
        "Manchester",
        "New York",
        "6535 - Location 4",
        "6535 - Location 5",
        "Location-6531"
      ]
    },
    filters: {
      locations: []
    },
    remote: {},
    search: "",
    nonTagFilters: ["departments", "locations"],
    searchBy: (row, search) => {
      const searchableText = row.context;
      return searchableText.toLowerCase().includes(search.toLowerCase());
    },
    columnDefs: [
      {
        title: "Tag Key",
        display: function TaggingCell(row) {
          const { context } = row;
          return <div className="name_td">{context}</div>;
        },
        sortBy: row => row.context,
        width: 200
      },
      { title: "Locations", display: row => row.locations?.join(", "), width: "auto" }
    ],
    tableName: "Tags",
    namespace: "glTable",
    dropdownColumnDefs: [
      {
        title: "Tag Value",
        display: (row, tagValueName) => tagValueName,
        sortBy: row => row,
        width: 200,
        colSpan: 2
      }
    ],
    expandRow: "",
    enableRowSelect: false,
    enableDropdownRow: true,
    restrictSearchChars: e => {
      if (!tagKeyMatchFull(e.key)) {
        e.preventDefault();
        return false;
      }
      return e;
    },
    rowName: "context",
    dropdownRowsName: "tag_names",
    searchPlaceholder: "Search by Tag Name",
    uniqueKey: "context"
  }
};

export default props;
