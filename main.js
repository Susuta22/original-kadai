/* jshint curly:true, debug:true */
/* globals $, firebase */

new Vue ({
  el: '#gallery',
  data: {
    activeTab: 'west-europe',
    photos: [],
  },
});

$('#select-area').hide();


$('#photo-form').on('submit', (e) => {
  e.preventDefault();
  
  const country = $('#country').val();
  const city = $('#city').val();
  const information = $('#information').val();
  const $photoImage = $('#select-photo');
  const selectArea = $('#select-area').val();   // this.activeTab
  const { files } = $photoImage[0];

  if (files.length === 0) {
    return;
  };

  const file = files[0];
  const filename = file.name;
  
  const photoImageLocation = `album/${selectArea}/${filename}`;
  
  firebase.storage().ref(photoImageLocation).put(file).then(() => {
    const photoData = {
      country,
      city,
      information,
      photoImageLocation,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    return firebase.database().ref(`${selectArea}-photos`).push(photoData);
  }).then(() => {
    window.location.reload(false);
  }).catch((error) => {
    console.error('エラー', error);
  });
});



const photoRef = firebase.database();

photoRef.ref('west-europe-photos').on("value", (snapshot) => {
  snapshot.forEach((children) => {
    const westEurope = children.val();
    const photoRef = westEurope.photoImageLocation;
    firebase.storage().ref(photoRef).getDownloadURL().then((url) => {
      const $divTag = $('#we-template').clone();
      $divTag.removeClass('we-template');
      $divTag.find('.popup').attr('href', url);
      $divTag.find('.west-europe-image').attr('src', url);
      $divTag.find('.photo-country').text(westEurope.country);
      $divTag.find('.photo-city').text(westEurope.city);
      $divTag.find('.photo-information').text(westEurope.information);
      $divTag.appendTo('#we-photo__item');
      $divTag.find('img').css({
        width: 270,
        height: 170,
      });
      $('.popup').magnificPopup({
        type: 'image',
      });
    }).then(() => {
      $('.we-template').hide();
    });
  });
});

$('#gallery-menu-2').one('click', () => {
  photoRef.ref('east-europe-photos').once("value", (snapshot) => {
  snapshot.forEach((children) => {
    const eastEurope = children.val();
    const photoRef = eastEurope.photoImageLocation;
    firebase.storage().ref(photoRef).getDownloadURL().then((url) => {
      const $divTag = $('#ee-template').clone();
      $divTag.removeClass('ee-template');
      $divTag.find('.popup').attr('href', url);
      $divTag.find('.east-europe-image').attr('src', url);
      $divTag.find('.photo-country').text(eastEurope.country);
      $divTag.find('.photo-city').text(eastEurope.city);
      $divTag.find('.photo-information').text(eastEurope.information);
      $divTag.appendTo('#ee-photo__item');
      $divTag.find('img').css({
        width: 270,
        height: 170,
      });
      $('.popup').magnificPopup({
        type: 'image',
      });
    }).then(() => {
      $('.ee-template').hide();
    });
  });
});
});

$('#gallery-menu-3').one('click', () => {
  photoRef.ref('west-asia-photos').once("value", (snapshot) => {
    snapshot.forEach((children) => {
      const westAsia = children.val();
      const photoRef = westAsia.photoImageLocation;
      firebase.storage().ref(photoRef).getDownloadURL().then((url) => {
        const $divTag = $('#wa-template').clone();
        $divTag.removeClass('wa-template');
        $divTag.find('.popup').attr('href', url);
        $divTag.find('.west-asia-image').attr('src', url);
        $divTag.find('.photo-country').text(westAsia.country);
        $divTag.find('.photo-city').text(westAsia.city);
        $divTag.find('.photo-information').text(westAsia.information);
        $divTag.appendTo('#wa-photo__item');
        $divTag.find('img').css({
          width: 270,
          height: 170,
        });
        $('.popup').magnificPopup({
          type: 'image',
        });
      }).then(() => {
        $('.wa-template').hide();
      });
    });
  });
});

$('#gallery-menu-4').one('click', () => {
  photoRef.ref('east-asia-photos').once("value", (snapshot) => {
    snapshot.forEach((children) => {
      const eastAsia = children.val();
      const photoRef = eastAsia.photoImageLocation;
      firebase.storage().ref(photoRef).getDownloadURL().then((url) => {
        const $divTag = $('#ea-template').clone();
        $divTag.removeClass('ea-template');
        $divTag.find('.popup').attr('href', url);
        $divTag.find('.east-asia-image').attr('src', url);
        $divTag.find('.photo-country').text(eastAsia.country);
        $divTag.find('.photo-city').text(eastAsia.city);
        $divTag.find('.photo-information').text(eastAsia.information);
        $divTag.appendTo('#ea-photo__item');
        $divTag.find('img').css({
          width: 270,
          height: 170,
        });
        $('.popup').magnificPopup({
          type: 'image',
        });
      }).then(() => {
        $('.ea-template').hide();
      });
    });
  });
});

const slides = () => {
  $('.slides').slick({
    autoplay: true,
    autoplaySpeed: 4500,
    infinite: true,
    dots: true,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1.66,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
};

slides();