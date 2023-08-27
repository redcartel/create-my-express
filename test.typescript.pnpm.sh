echo "### TEST pnpm & TypeScript ###"
rm -rf test && pnpm start --typescript test
cd test
yarn test
PORT=9876 timeout 3 yarn dev
cat package.json
cat README.md
cd ..