'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
      
      return queryInterface.bulkInsert('recommendations', [{
        author: 'Grace',
        category: 'Books',
        title: 'Old Man and the Sea',
        post: 'You will want your Dad to read it.',
        image_url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
      author: 'Anna',
      category: 'Books',
      title: 'The Double',
      post: 'Terrifying.',
      image_url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      author: 'Steve',
      category: 'Books',
      title: 'Game of Thrones',
      post: 'When is the next book coming out?',
      image_url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      author: 'James',
      category: 'Books',
      title: 'Eat, Pray, Love',
      post: 'Changed my life.',
      image_url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      author: 'Emily',
      category: 'Books',
      title: 'Jane Eyre',
      post: 'Scandalous.',
      image_url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      author: 'Karl',
      category: 'Restaurants',
      title: 'White Castle',
      post: 'The Crave Case packaging concept is unparalleled.',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4op4CK9iXUS95PSjeOvsQQOCp1P0odSH9NbisVBk4mLhu9Y3ENg',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      author: 'Michelle',
      category: 'Restaurants',
      title: 'Tim Horton\'s',
      post: 'Will totally do if you cannot find a Dunkin\' Donuts.',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR4FLqRYWlQu75EQiyJx5mkCx9qfUaT1t84z1hr6UVlYiN91bj',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      author: 'Josh',
      category: 'Restaurants',
      title: 'Margaritaville',
      post: 'Can\'t miss date spot.',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhdNSXCSgk42g7eJIIG2kfmHaIaKjsZ-NgCmdyQy2Om0q84CJZ',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      author: 'Liz',
      category: 'Songs',
      title: 'Punk Rock Academy',
      post: 'I want to be enrolled at the Punk Rock Academy.',
      image_url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      author: 'Will',
      category: 'Shows',
      title: 'Cheers',
      post: 'Sam Malone gets me.',
      image_url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      author: 'Jill',
      category: 'Shows',
      title: 'The Simpsons',
      post: 'I must return to my comic book store, where I dispense the insults rather than absorb them.',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo5pSwExJBkGYw_CztwKCWdGRWZdNkCPpbuJKPlOTtOAs47p06Pw',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      author: 'John',
      category: 'Shows',
      title: 'It\'s Always Sunny in Philadelphia',
      post: 'Amazing.',
      image_url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
