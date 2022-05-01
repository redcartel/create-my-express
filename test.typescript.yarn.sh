echo "### TEST yarn & TypeScript ###"
rm -rf test && node index.js --typescript --yarn test
cd test
yarn test
PORT=9876 timeout 3 yarn dev
cat package.json
cat README.md
cd ..