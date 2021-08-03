FROM ruby:3.0.0
RUN apt-get update -qq \
&& apt-get install -y nodejs postgresql-client
ADD . /app
WORKDIR /app
RUN bundle install
EXPOSE 5000
CMD ["bash"]