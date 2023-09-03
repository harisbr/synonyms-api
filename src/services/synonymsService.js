import { dataHelper } from '../utils/helpers/index.js';
import { NotFoundError, BadRequestError } from '../utils/errors/index.js';

class SynonymsService {
  library = new Map();

  constructor(logger) {
    this.logger = logger;
    // predifend values as example
    this.insert('beautiful', ['attractive', 'pretty']);
  }

  get(word) {
    const synonyms = this.library.get(word);
    if (!synonyms) {
      this.logger.error(`Word: ${word} not found.`);
      throw new NotFoundError('Requested word not found.');
    }
    return {
      data: { word, synonyms },
    };
  }

  insert(word, synonyms) {
    if (!word || !synonyms) {
      throw new BadRequestError('Please provide valid request input.');
    }
    this.logger.debug(`Inserting new word: ${word} with synonyms: ${synonyms}`);
    if (this.library.get(word)) {
      this.logger.error(`Word: ${word} already exists.`);
      throw new BadRequestError('Already exists. Please update existing one.');
    }
    let wordsSynonyms = [...synonyms];
    const nonexistentWords = [];

    /*
      Iterate through each incoming synonym and if it exists,
      accordingly update its child synonyms with new values
      If incoming synonym does not exist, prepare it for insertion
      with corresponding child synonyms
    * */
    synonyms.forEach((syn) => {
      const synExists = this.library.get(syn);
      if (synExists) {
        wordsSynonyms = [...wordsSynonyms, ...synExists];
        const newSynonyms = dataHelper.filterAndMerge(
          synonyms,
          syn,
          word,
          synExists,
        );

        /*
          Update existing word with new synonyms to fullfil transitive rule
          Update existing word's already presented synonyms with new ones
        * */
        this.library.set(syn, newSynonyms);

        synExists.forEach((childSyn) => {
          const childSynonyms = this.library.get(childSyn);
          if (childSynonyms) {
            this.library.set(
              childSyn,
              dataHelper.filterAndMerge(
                newSynonyms,
                childSyn,
                word,
                childSynonyms,
              ),
            );
          }
        });
      } else {
        nonexistentWords.push(syn);
      }
    });
    this.library.set(word, [
      ...new Set([...wordsSynonyms.filter((val) => val !== word)]),
    ]);

    /*
      For every new word create new insertion with corresponding synonyms
    * */
    nonexistentWords.forEach((nonexistentWord) => {
      this.library.set(
        nonexistentWord,
        dataHelper.filterAndMerge(wordsSynonyms, nonexistentWord, word),
      );
    });
    this.logger.debug(
      `Successfully inserted word: ${word} and synonyms: ${synonyms}`,
    );
    return 'Successfully inserted.';
  }

  update(word, synonyms) {
    this.logger.debug(`Updating word: ${word} with new synonyms: ${synonyms}`);
    const currentSynonyms = this.library.get(word);
    if (!currentSynonyms) {
      this.logger.error(`Word: ${word} not found.`);
      throw new NotFoundError('Requested word not found.');
    }
    const newSynonyms = dataHelper.arrayDiff(synonyms, currentSynonyms);
    const removedSynonyms = dataHelper.arrayDiff(currentSynonyms, synonyms);
    /*
      For every newly added synonym apply inserting logic
    * */
    newSynonyms.forEach((newSynonym) => {
      if (!this.library.get(newSynonym)) {
        this.insert(newSynonym, [
          ...synonyms.filter((val) => val !== newSynonym),
          word,
        ]);
      }
    });
    /*
      For every removed synonym delete word as removed word synonym
      If the removed synonym is under transitive rule, it will be removed
      only for the edited word (can be used for specific cases where
      transitive rule should not apply)
    * */
    removedSynonyms.forEach((removed) => {
      const oldSynonyms = this.library.get(removed);
      this.library.set(
        removed,
        oldSynonyms.filter((val) => val !== word),
      );
    });
    /*
      At the end, update word with new synonyms
    * */
    this.library.set(word, synonyms);
    this.logger.debug(
      `Successfully updated word: ${word} and synonyms: ${synonyms}`,
    );
    return 'Successfully updated.';
  }

  delete(word) {
    this.logger.debug(`Deleting word: ${word}`);
    const synonyms = this.library.get(word);
    if (!synonyms) {
      this.logger.error(`Word: ${word} not found.`);
      throw new NotFoundError('Requested word not found.');
    }
    /*
      Word deletion and update of its reference value to remove
      deleted word as a synonym
    * */
    this.library.delete(word);
    synonyms.forEach((syn) => {
      this.library.set(syn, [
        ...this.library.get(syn).filter((val) => val !== word),
      ]);
    });
    this.logger.debug(`Successfully deleted word: ${word}`);
    return 'Successfully deleted.';
  }
}

export default SynonymsService;
