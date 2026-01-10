const recipes = [
  {name:'Margherita Pizza', ingredients:['tomato','mozzarella','basil','dough']},
  {name:'Beef Burger', ingredients:['beef','bun','cheese','lettuce']},
  {name:'Pasta Carbonara', ingredients:['pasta','egg','cheese','bacon']},
  {name:'Garlic Bread', ingredients:['bread','garlic','butter']},
  {name:'Bruschetta', ingredients:['tomato','basil','bread']},
  {name:'Caesar Salad', ingredients:['lettuce','croutons','parmesan']},
  {name:'Chocolate Cake', ingredients:['chocolate','flour','sugar','egg']},
  {name:'Ice Cream', ingredients:['milk','cream','sugar']},
  {name:'Cheesecake', ingredients:['cream cheese','egg','sugar']},
];

function suggest(ingredientString) {
  const input = ingredientString.toLowerCase().split(',').map(s=>s.trim()).filter(Boolean);
  if (!input.length) return [];
  // score each recipe by how many input ingredients are found
  const scored = recipes.map(r => {
    const matchCount = input.reduce((c,ing) => c + (r.ingredients.some(i => i.includes(ing)) ? 1 : 0), 0);
    return {...r, matchCount};
  }).filter(r => r.matchCount > 0).sort((a,b)=>b.matchCount - a.matchCount);
  return scored;
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('suggestBtn');
  if (!button) return;
  button.addEventListener('click', () => {
    const q = document.getElementById('ingredientsInput').value;
    const out = document.getElementById('recipeResults');
    out.innerHTML = '';
    const results = suggest(q);
    if (!results.length) {
      out.innerHTML = '<p>No recipes match your ingredients. Try other items.</p>';
      return;
    }
    results.forEach(r => {
      const el = document.createElement('div');
      el.className = 'result';
      el.innerHTML = `<strong>${r.name}</strong> — matched ingredients: ${r.matchCount}`;
      out.appendChild(el);
    });
  });
});
