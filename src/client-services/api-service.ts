import { Kit } from '@/models';

export default {
  autocompletePost: async function (searchValue: string): Promise<string[]> {
    const response = await fetch('/api/autocomplete', {
      method: 'POST',
      body: JSON.stringify({
        searchValue,
      }),
    })
    var resBody = await response.json();
    return resBody.suggestedLabelIds;
  },

  kitsGet: async function (labelId: string): Promise<Kit | null> {
    const response = await fetch(`/api/kits/${labelId}`, {
      method: 'GET'
    })
    var resBody = await response.json();
    return resBody;
  }
}
