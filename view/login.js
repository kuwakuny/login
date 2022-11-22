function login(event) {
  event.preventDefault()
  let id = document.getElementById('id').value
  let password = document.getElementById('password').value

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
        document.getElementById('password').value = ''
      } else {
        let welcomeText = document.createElement('h3')
        welcomeText.textContent = data.name + 'さん歓迎します！'

        document.getElementById('form').remove()
        document.getElementById('all').appendChild(welcomeText)
      }
    })
    .catch((err) => {
      alert('DBエラー。担当者にお問い合わせください。')
      console.log(err)
    })
}
