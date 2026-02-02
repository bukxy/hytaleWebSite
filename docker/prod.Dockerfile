# ===== BUILD (php + composer + node) =====
FROM php:8.3-cli-alpine AS build

RUN apk add --no-cache \
    git unzip zip \
    nodejs npm \
    icu-dev oniguruma-dev libzip-dev \
  && docker-php-ext-install intl mbstring zip pdo_mysql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress --optimize-autoloader

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# env minimal pour que artisan puisse booter si nécessaire
ENV APP_ENV=production \
    APP_DEBUG=false \
    APP_KEY=base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=

RUN npm run build


# ===== RUNTIME (php-fpm) =====
FROM php:8.3-fpm-alpine AS app
RUN apk add --no-cache oniguruma-dev libxml2-dev \
  && docker-php-ext-install bcmath ctype fileinfo mbstring pdo_mysql xml opcache

WORKDIR /var/www/html
COPY . .
COPY --from=build /app/vendor ./vendor
COPY --from=build /app/public/build ./public/build

RUN chown -R www-data:www-data storage bootstrap/cache \
 && chmod -R ug+rwx storage bootstrap/cache

CMD ["php-fpm"]


# FROM node:20-alpine AS node20
# FROM php:8.3-fpm-alpine
#
# # Installation dans votre Image du minimum pour que Docker fonctionne
# RUN apk add oniguruma-dev libxml2-dev
# RUN docker-php-ext-install \
#         bcmath \
#         ctype \
#         fileinfo \
#         mbstring \
#         pdo_mysql \
#         xml
#
# # Installation dans votre image de Composer
# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
#
# # Installation dans votre image de NodeJS
# # RUN apk add nodejs npm
#
# # ENV WEB_DOCUMENT_ROOT /app/public
# # ENV APP_ENV production
# WORKDIR /app
# COPY . .
#
# # On copie le fichier .env.example pour le renommer en .env
# # Vous pouvez modifier le .env.example pour indiquer la configuration de votre site pour la production
# # RUN cp -n .env.example .env
#
# # Installation et configuration de votre site pour la production
# # https://laravel.com/docs/10.x/deployment#optimizing-configuration-loading
# RUN composer install --no-interaction --optimize-autoloader --no-dev
# # Generate security key
# # RUN php artisan key:generate
# # Optimizing Configuration loading
# RUN php artisan config:cache
# # Optimizing Route loading
# RUN php artisan route:cache
# # Optimizing View loading
# # RUN php artisan view:cache
#
# # Compilation des assets de Breeze (ou de votre site)
# RUN npm install
# RUN npm run build

# RUN chown -R application:application .
######################################################################
# FROM php:8.3-fpm-alpine AS phpbuilder
# WORKDIR /var/www/html
#
# RUN apk add --no-cache \
#     bash git curl unzip icu-dev oniguruma-dev libzip-dev zip mysql-client \
#   && docker-php-ext-install pdo_mysql mbstring intl zip opcache bcmath pcntl
#
# COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
#
# COPY composer.json composer.lock* ./
# RUN composer install --no-dev --prefer-dist --no-interaction --optimize-autoloader --no-scripts
#
# COPY . .
# RUN rm -f bootstrap/cache/*.php || true
#
# COPY --from=nodebuild /app/public/build ./public/build
#
# ENV APP_ENV=production \
#     APP_DEBUG=false \
#     APP_KEY=base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
#
# RUN php artisan package:discover --ansi
# RUN php artisan config:cache && php artisan route:cache
#
# FROM php:8.3-fpm-alpine
# WORKDIR /var/www/html
#
# RUN apk add --no-cache \
#     bash icu-dev oniguruma-dev libzip-dev zip mysql-client \
#   && docker-php-ext-install pdo_mysql mbstring intl zip opcache bcmath pcntl
#
# COPY --from=phpbuilder /var/www/html /var/www/html
# RUN chown -R www-data:www-data storage bootstrap/cache
#
# CMD ["php-fpm"]
