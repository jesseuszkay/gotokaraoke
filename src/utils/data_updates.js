function newTags(songs) {
  const newTags = [];
  songs.forEach((song) => {
    const tagArray = song.tags.split(",");
    if (tagArray.length) {
      tagArray.forEach((tag) => {
        if (!newTags.includes(tag.trim())) newTags.push(tag.trim());
      });
    }
  });
  return newTags;
}

function matchTags(songs, tags) {
  const tagsMatch = [];
  songs.forEach((song) => {
    const tagArray = song.tags.split(",");
    if (tagArray.length) {
      tagArray.forEach((tag) => {
        const tagInfo = tags.find((element) => element.tag_name === tag.trim());
        tagsMatch.push([tagInfo.id, song.id]);
      });
    }
  });
  return tagsMatch;
}

const array = matchTags(songList, tagList);
const content = array.join("), (");
const blob = new Blob([content], { type: "text/plain" });
const url = URL.createObjectURL(blob);
const link = document.createElement("a");
link.href = url;
link.download = "output.txt";
link.click();
URL.revokeObjectURL(url);
