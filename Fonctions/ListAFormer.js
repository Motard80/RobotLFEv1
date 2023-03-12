// Fonction MemberAFormer
function MemberAFormer(role) {
  const members = role.members.array();
  const now = new Date();
  const result = {
      lessThanTwoWeeks: [],
      betweenTwoWeeksAndOneMonth: [],
      moreThanOneMonth: []
  };
  members.forEach(member => {
      const duration = now - member.joinedAt;
      const days = duration / (1000 * 60 * 60 * 24);
      if (days < 14) {
          result.lessThanTwoWeeks.push(member.user.username);
      } else if (days < 30) {
          result.betweenTwoWeeksAndOneMonth.push(member.user.username);
      } else {
          result.moreThanOneMonth.push(member.user.username);
      }
  });
  return result;
}
module.exports= {MemberAFormer};