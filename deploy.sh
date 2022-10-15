set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/mmaa7850/big-game.git master:gh-pages
cd -