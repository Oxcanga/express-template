# Express.js Şablon Projesi

Bu, MongoDB, JWT kimlik doğrulaması ve temel kullanıcı kaydı ile bir Express.js uygulaması için bir şablon projesidir.

## Gereksinimler

- Node.js
- npm (Node Paket Yöneticisi)
- MongoDB

## Kurulum

1. Depoyu klonlayın:
    ```sh
    git clone https://github.com/Oxcanga/express-template.git
    # Daha sonrasında dizine cd komutu ile girin.
    ```

2. Bağımlılıkları yükleyin:
    ```sh
    npm install
    ```

3. MongoDB sunucusunu başlatın:
    ```sh
    mongod
    ```

4. Uygulamayı başlatın:
    ```sh
    npm start
    ```

## Kullanım

- Uygulama `http://localhost:3000` adresinde çalışacaktır.
- Yeni bir kullanıcı kaydetmek için `username` ve `password` içeren bir POST isteği göndererek `/register` uç noktasını kullanın.

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Herhangi bir değişiklik için lütfen bir sorun açın veya bir çekme isteği gönderin.

## Lisans

Bu proje MIT Lisansı ile lisanslanmıştır.