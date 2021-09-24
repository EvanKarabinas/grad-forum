export const fetchData = async url => {
  // console.log("Sending GET request to " + url);
  let fetchedData = await fetch(url, {
    credentials: "include"
  });
  // console.log("DATA" + fetchedData);
  let dataJson = await fetchedData.json();
  // console.log("FETCHEDDATA" + dataJson);

  return dataJson;
};

export const fetchPhoto = url => {
  return "uploads/" + url;
};

export const timeDiff = createdAt => {
  let createdAtDate = createdAt.split("T")[0];
  let createdAtTime = createdAt.split("T")[1];
  createdAtTime = createdAtTime.slice(0, -1);

  let createdAtYear = Number(createdAtDate.split("-")[0]);
  let createdAtMonth = Number(createdAtDate.split("-")[1]) - 1;
  let createdAtDay = Number(createdAtDate.split("-")[2]);
  let createdAtHour = Number(createdAtTime.split(":")[0]);
  let createdAtMinute = Number(createdAtTime.split(":")[1]);
  let createdAtSecond = Math.floor(createdAtTime.split(":")[2]);

  let oneSec = 1000;
  let oneMin = 60 * 1000;
  let oneHour = 60 * 60 * 1000;
  let oneDay = 24 * 60 * 60 * 1000;
  let oneMonth = 30 * 24 * 60 * 60 * 1000;

  let firstDate = new Date();

  let secondDate = new Date(
    Date.UTC(
      createdAtYear,
      createdAtMonth,
      createdAtDay,
      createdAtHour,
      createdAtMinute,
      createdAtSecond
    )
  );

  let diffSecs = Math.round(
    Math.abs((firstDate - secondDate.getTime()) / oneSec)
  );

  let diffMins = Math.round(
    Math.abs((firstDate - secondDate.getTime()) / oneMin)
  );

  let diffHours = Math.round(
    Math.abs((firstDate - secondDate.getTime()) / oneHour)
  );

  let diffDays = Math.round(
    Math.abs((firstDate - secondDate.getTime()) / oneDay)
  );
  let diffMonth = Math.round(
    Math.abs((firstDate - secondDate.getTime()) / oneMonth)
  );

  if (diffMonth >= 1) {
    return diffMonth === 1 ? diffMonth + " μήνα" : diffMonth + " μήνες";
  }

  if (diffDays >= 1) {
    return diffDays === 1 ? diffDays + " μέρα" : diffDays + " μέρες";
  }

  if (diffHours >= 1) {
    return diffHours === 1 ? diffHours + " ώρα" : diffHours + " ώρες";
  }

  if (diffMins >= 1) {
    return diffMins === 1 ? diffMins + " λεπτό" : diffMins + " λεπτά";
  }

  if (diffSecs >= 10) {
    return diffSecs + " δευτερόλεπτα";
  }

  return "Μόλις τώρα";
};

export const monthConversion = monthNumber => {
  let months = {
    "01": "Ιανουαρίου",
    "02": "Φεβρουαρίου",
    "03": "Μαρτίου",
    "04": "Απριλίου",
    "05": "Μαίου",
    "06": "Ιουνίου",
    "07": "Ιουλίου",
    "08": "Αυγούστου",
    "09": "Σεπτεμβρίου",
    "10": "Οκτωβρίου",
    "11": "Νοεμβρίου",
    "12": "Δεκεμβρίου"
  };

  return months[monthNumber];
};
