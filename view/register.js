function register(event) {
  event.preventDefault()
  let name = document.getElementById('name').value
  let id = document.getElementById('id').value
  let password = document.getElementById('password').value

  if (!name || !id || !password) {
    alert('全部入力してください。')
    return
  }

  fetch('http://localhost:1225/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      id: id,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.sqlState == '23000') {
        alert('IDが重複しています。')
        return
      }

      if (data.affectedRows == 0) {
        alert('登録できませんでした。')
        window.location.reload()
      } else if (data.affectedRows == 1) {
        alert('登録が完了しました。')
        location.href = 'login.html'
      }
    })
    .catch((err) => {
      alert('DBエラー。担当者にお問い合わせください。')
      console.log(err)
    })
}
