echo "### TEST npm & TypeScript ###"
rm -rf test && node index.js --typescript test
cd test
npm test
PORT=9876 timeout 3 npm run dev
cat package.json
cat README.md
cd ..