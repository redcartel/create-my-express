echo "### TEST yarn & TypeScript ###"
rm -rf test && yarn start --typescript test
cd test
yarn test
PORT=9876 timeout 3 yarn dev
cat package.json
cat README.md
cd ..