function login(event) {
  event.preventDefault()
  const id = document.getElementById('id').value
  const password = document.getElementById('password').value

  if (!id || !password) {
    alert('全部入力してください。')
    return
  }

  fetch('http://localhost:1225/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (!data.name) {
        alert('会員情報が見つかりません。')
        window.location.reload()
      } else if (data.name) {
        let welcomeText = document.createElement('h3')
        welcomeText.textContent = data.name + 'さん歓迎します！'

        document.getElementById('form').remove()
        document.getElementById('all').appendChild(welcomeText)
      }
    })
    .catch((err) => {
      alert('DBエラー。担当者にお問い合わせください。')
      console.error('DBエラー:\n', err)
    })
}
