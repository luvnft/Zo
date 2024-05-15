import type Hotel from '@/domain/entities/Hotel'
import Thumbnails from '@/infra/store/thumbs/thumbs.json'

const hotelsMock = [
  {
    id: 1,
    title: 'BLRxZo',
    subtitle: 'A Real Life space built for creators, collectors, and NFT enthusiasts to work, live, socialize, and network.',
    description: ' This unique hub offers NFT-themed suites and dorms, creating a vibrant environment that caters specifically to the interests and lifestyles of its community. In addition to residential options, Zo House provides co-working zones tailored for collaboration and productivity across various Web3 projects. It hosts regular Web3 events, ranging from workshops to seminars, positioning itself as a central hub for the latest in digital innovation. Around-the-clock chef services ensure that creative energies are well-nourished at any hour, enhancing the communal and dynamic atmosphere.',
    address: 'Koramnagala, Bengaluru',
    rating: {
      votesCount: '2.4K',
      rating: 4.8,
      stars: 4.8,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of Web3',
      section: 'IRL Experiences',
    },
    chart: {
      place: 1,
      category: 'Zo House IRL',
    },
    price: 18,
    picture: '/pics/hotel-1.jpg',
    rooms: [
      {
        id: 1,
        title: 'CCO / Gutten Den',
        subtitle: 'This space is crafted for when you travel solo or with your builder comrades.',
        price: 18,
        picture: '/pics/room-1.jpg',
      },
      {
        id: 2,
        title: 'Luxury Private Suite',
        subtitle: 'The Optimus Prime of luxury private rooms.',
        price: 65,
        picture: '/pics/room-2.jpg',
      },
    ],
  },
  {
    id: 2,
    title: 'DXBxZo',
    subtitle: 'Richer cousin of BLRxZo. If you think money can\'t buy happiness, Habibi come to @DXBxZo',
    description: ' This unique hub offers NFT-themed suites and dorms, creating a vibrant environment that caters specifically to the interests and lifestyles of its community. In addition to residential options, Zo House provides co-working zones tailored for collaboration and productivity across various Web3 projects. It hosts regular Web3 events, ranging from workshops to seminars, positioning itself as a central hub for the latest in digital innovation. Around-the-clock chef services ensure that creative energies are well-nourished at any hour, enhancing the communal and dynamic atmosphere.',
    address: 'Downtown, Dubai',
    rating: {
      votesCount: '2.4K',
      rating: 4.8,
      stars: 4.8,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of Web3',
      section: 'IRL Experiences',
    },
    chart: {
      place: 1,
      category: 'Zo House IRL',
    },
    price: 50,
    picture: '/pics/hotel-2.jpg',
    rooms: [
      {
        id: 1,
        title: 'CCO / Gutten Den',
        subtitle: 'This space is crafted for when you travel solo or with your builder comrades.',
        price: 50,
        picture: '/pics/room-1.jpg',
      },
      {
        id: 2,
        title: 'Luxury Private Suite',
        subtitle: 'The Optimus Prime of luxury private rooms.',
        price: 150,
        picture: '/pics/room-2.jpg',
      },
    ],
  },
  {
    id: 3,
    title: 'SFOxZo',
    subtitle: 'Admiring the mosaic of human endeavor. A crypto clubhouse in downtown SF - curating the best lifestyle in the Bay Area.',
    description: ' This unique hub offers NFT-themed suites and dorms, creating a vibrant environment that caters specifically to the interests and lifestyles of its community. In addition to residential options, Zo House provides co-working zones tailored for collaboration and productivity across various Web3 projects. It hosts regular Web3 events, ranging from workshops to seminars, positioning itself as a central hub for the latest in digital innovation. Around-the-clock chef services ensure that creative energies are well-nourished at any hour, enhancing the communal and dynamic atmosphere.',
    address: 'Bay Area, San Fransisco',
    rating: {
      votesCount: '2.4K',
      rating: 4.8,
      stars: 4.8,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of Web3',
      section: 'IRL Experiences',
    },
    chart: {
      place: 1,
      category: 'Zo House IRL',
    },
    price: 60,
    picture: '/pics/hotel-3.jpg',
    rooms: [
      {
        id: 1,
        title: 'CCO / Gutten Den',
        subtitle: 'This space is crafted for when you travel solo or with your builder comrades.',
        price: 60,
        picture: '/pics/room-1.jpg',
      },
      {
        id: 2,
        title: 'Luxury Private Suite',
        subtitle: 'The Optimus Prime of luxury private rooms.',
        price: 180,
        picture: '/pics/room-2.jpg',
      },
    ],
  },
]

/**
 * Add picture thumb to an entity based on the picture name
 *
 * @param entity - something with "picture" property
 */
function addThumb<T extends { picture: string }>(entity: T): T & { pictureThumb: string } {
  const pictureName = entity.picture.split('/').pop() as keyof typeof Thumbnails.thumbs

  return {
    ...entity,
    pictureThumb: Thumbnails.thumbs[pictureName],
  }
}

/**
 * Add picture thumbs to hotels based on the picture name
 */
function addThumbs(hotels: Hotel[]): Hotel[] {
  return hotels.map((hotel) => {
    /**
     * Add picture thumb to rooms as well
     */
    hotel.rooms = hotel.rooms.map(addThumb)

    return addThumb(hotel)
  })
}

export const hotels = addThumbs(hotelsMock)
