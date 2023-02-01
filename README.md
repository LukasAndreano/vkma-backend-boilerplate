# 👨🏻‍💻 VK Mini App Backend Boilerplate

## ❓Что это такое ❓

Это стартовый кит _(шаблон)_ для создания бэкенда для сервиса на платформе [VK Mini Apps](https://vk.com/services). Шаблон основан на [Nest](https://nestjs.com).

## ⚙️ Начало работы

Склонируйте репозиторий в нужную вам директорию:

```bash
git clone https://github.com/LukasAndreano/vkma-backend-boilerplate.git <name>
```

Установите зависимости:

```bash
cd <name>
yarn
```

Пропишите правильные доступы к БД, создав файл **.env** (он не идет в GIT, игнорируется), используя **env.example**. После чего запустите сервинг:

```bash
yarn dev
```

После чего в корневой директории появится файл params.txt (если указан [USER_DEV_TOKEN](https://oauth.vk.com/oauth/authorize?client_id=6121396&scope=65536&redirect_uri=https://oauth.vk.com/blank.html&display=page&response_type=token&revoke=1&slogin_h=160c9e1da75958d08f.e6a5d96c3766f10f8e&__q_hash=0a40f7bec3a6b2d219f9b7b783c34a14)), который используется для авторизации (Bearer).
