
export function domainListGenerator (pattern: string, tlds: string | any[] | undefined) {
    const _pattern = pattern.match(/[ACV]|[a-z]+/g);

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    const vowels = ['a', 'e', 'i', 'o', 'u'];
  
    let domainList: string[] = [];
  
    function iterator (lastIndex: number, word = '', tld = '.com') {
      const index = lastIndex + 1;
      if (index > _pattern!.length - 1) {
        let _tld = tld.slice(0, 1) === '.' ? tld : '.' + tld;
        let domain = word + _tld;
        domainList.push(domain.toLowerCase());
      } else if (_pattern![index] === 'A') {
        alphabet.map(letter =>
          iterator(index, word + letter, tld)
        );
      } else if (_pattern![index] === 'C') {
        consonants.map(consonant =>
          iterator(index, word + consonant, tld)
        );
      } else if (_pattern![index] === 'V') {
        vowels.map(vowel =>
          iterator(index, word + vowel, tld)
        );
      } else {
        iterator(index, word + _pattern![index], tld);
      }
    }
  
    if (Array.isArray(tlds)) {
      tlds.map(tld => iterator(-1, '', tld));
    } else if (typeof tlds === 'string') {
      iterator(-1, '', tlds);
    } else if (!tlds) {
      iterator(-1);
    }
  
    return domainList;
  }