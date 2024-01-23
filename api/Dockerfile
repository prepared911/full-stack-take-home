## Dockerfile was inspired by: https://evilmartians.com/chronicles/ruby-on-whales-docker-for-ruby-rails-development
ARG RUBY_VERSION=3.1.2
ARG DISTRO_NAME=bullseye

FROM ruby:$RUBY_VERSION-slim-$DISTRO_NAME

# Args reset after FROM
ARG DISTRO_NAME

# Common dependencies
RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
  build-essential \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

WORKDIR /app

RUN groupadd -g 1000 ruby \
  && useradd --create-home --no-log-init -u 1000 -g 1000 ruby

ENV LANG=C.UTF-8 \
  BUNDLE_JOBS=$(nproc) \
  BUNDLE_RETRY=3 \
  BUNDLE_APP_CONFIG=.bundle

# Upgrade RubyGems and install the latest Bundler version
RUN gem update --system && \
  gem install bundler -v 2.4.12

COPY --chown=ruby:ruby Gemfile Gemfile.lock ./
RUN bundle install

COPY --chown=ruby:ruby . .

RUN bundle exec rails db:migrate db:seed
RUN bundle exec bootsnap precompile --gemfile app/ lib/

USER 1000

ENV PORT 3000
EXPOSE $PORT