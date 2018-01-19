fetch('//localhost:3000/chapter/publish', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  credentials:"include",
  body: JSON.stringify({
    title:"第一个标题",
    content:"正文"
  })
}).then(res=>res.json())
  .then(res => console.log(res));

  fetch('//localhost:3000/comment/publish', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials:"include",
    body: JSON.stringify({
      targetId:"5a60049483ca471ff414c833",
      chapterId:"5a604b83c7e3fc2408d52d44",
      content:"FBI WANNINNG!!"
    })
  }).then(res=>res.json())
    .then(res => console.log(res));
  
    fetch('//localhost:3000/reply/publish', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      credentials:"include",
      body: JSON.stringify({
        targetId:"5a60049483ca471ff414c833",
        commentId:"5a60513302b3b00b30676323",
        content:"ho ho ho!!"
      })
    }).then(res=>res.json())
      .then(res => console.log(res));