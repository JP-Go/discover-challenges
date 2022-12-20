"use strict";

const fetchUserData = async (user) => {
  const response = await fetch(`https://api.github.com/users/${user}`);
  return response.json();
};

const fetchUserRepoData = async (user) => {
  const response = await fetch(`https://api.github.com/users/${user}/repos`);
  return response.json();
};

const hidrateImg = (userData, imageNode) => {
  imageNode.src = userData.avatar_url;
};

const hidrateName = (userData, nameNode) => {
  nameNode.innerText = userData.name;
};

const toMap = (acc, item) => {
  if (acc.has(item)) {
    acc.set(item, acc.get(item) + 1);
  } else {
    acc.set(item, 1);
  }
  return acc;
};

const getTechnologies = async () => {
  const repoData = await fetchUserRepoData("JP-Go");
  const languages = repoData
    .map(({ language }) => language?.toUpperCase())
    .filter((item) => item)
    .reduce(toMap, new Map());
  return languages;
};

const orderTechnologies = (techData) => {
  const data = [];
  techData.forEach((_, tech) => {
    if (data[0] === undefined || techData.get(data[0]) > techData.get(tech)) {
      data.push(tech);
    } else {
      data.unshift(tech);
    }
  });
  return data;
};

const hidrateTechnologies = (techArray, domNode) => {
  const elements = techArray.map((tech) => {
    const span = document.createElement("span");
    span.innerText = tech;
    return span;
  });
  domNode.innerHTML = "";
  elements.forEach((elem) => {
    domNode.appendChild(elem);
  });
};
const hidrate = async () => {
  const userData = await fetchUserData("JP-Go");
  const techData = orderTechnologies(await getTechnologies());
  hidrateImg(userData, document.getElementById("avatar"));
  hidrateName(userData, document.getElementById("name"));
  hidrateTechnologies(techData, document.getElementById("techs"));
};

hidrate();
