function main() {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => funBtn(data.data));

  const funBtn = (data) => {
    const parantBtn = document.getElementById("btn-contair");

    data.forEach((item, index) => {
      const childBtn = document.createElement("div");
      childBtn.classList = "btn btn-active ml-4 active:bg-violet-700 ";
      childBtn.innerHTML = `
         <button onclick="dataLoad(${index})" class="btn btn-active">${item.category}</button>
        `;
      parantBtn.append(childBtn);
    });

    if (data.length > 0) {
      dataLoad(0);
    }
  };
}

const displayCard = (data) => {
  const parantCard = document.getElementById("card-parant");
  const parantDiv = document.getElementById("error-handel");

  // every time user clik and set parantCard
  parantCard.innerHTML = "";
  parantDiv.innerHTML = "";

  if (data.length === 0) {
    const createDiv = document.createElement("div");
    createDiv.classList = `w-full flex items-center justify-center h-full`;
    createDiv.innerHTML = `
    <div>
    <img class="mx-auto my-20" src="./resorce/Icon.png" alt="" />
    <div>
      <h2 class="text-3xl text-center mb-20">
        Oops!! Sorry, There is no content here
      </h2>
    </div>
    </div>
    `;
    parantDiv.append(createDiv);
  } else {
    data.forEach((item) => {
      const convertTime = item.others.posted_date / 60;
      console.log(convertTime.toFixed(2));

      const card = document.createElement("div");
      card.classList = `card w-96 bg-base-100 shadow-xl `;

      card.innerHTML = `
      <figure class="px-10 pt-10 relative">
        <img
          src="${item.thumbnail}"
          alt="${item.title}"
          class="rounded-xl cover"
        />
        ${
          item.others.posted_date
            ? `<p class='absolute bg-black-300 right-12 bottom-2 text-white font-medium'>${convertTime.toFixed(
                2
              )} min ago</p>`
            : ""
        }
      </figure>
      <div class="card-body items-center text-center">
        <div class="flex items-center justify-between gap-3">
          <div class="avatar">
            <div class="mask mask-squircle mr-4 w-12 h-12">
              <img
                src="${item.authors[0].profile_picture}"
                alt="${item.authors[0].profile_name}'s Avatar"
              />
            </div>
          </div>
          <div class="grid justify-items-start">
          <h3 class="text-2xl font-medium">${item.title}</h3>
          <div class="flex gap-3 items-center">
            <h2 class="font-semibold">${item.authors[0].profile_name}</h2>
            ${
              item.authors[0].verified
                ? "<p><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-patch-check-fill text-sky-500' viewBox='0 0 16 16'><path d='M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z'/></svg></p>"
                : ""
            }
          </div>
          <p>Views: ${item.others.views}</p>
        </div>
        
        
        </div>
      </div>
    `;

      parantCard.appendChild(card);
    });
  }
};

function dataLoad(categoryIndex) {
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => getId(data.data, categoryIndex));
}

const getId = (data, categoryIndex) => {
  const categoryId = data[categoryIndex].category_id;

  return fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  )
    .then((res) => res.json())
    .then((data) => displayCard(data.data));
};

const handleSortBtn = (id) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then((res) => res.json())
    .then((data) => convertSortByView(data.data));
};

const convertSortByView = (data) => {
  data.sort((a, b) => {
    const viewCountA = parseInt(a.others.views.replace(/[^0-9]/g, ""));
    const viewCountB = parseInt(b.others.views.replace(/[^0-9]/g, ""));

    if (viewCountA > viewCountB) {
      return -1;
    } else if (viewCountA < viewCountB) {
      return 1;
    } else {
      return 0;
    }
  });

  displayCard(data);
};

main();
