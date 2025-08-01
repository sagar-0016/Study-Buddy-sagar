
export type Flashcard = {
  id: number;
  question: string;
  answer: string;
};

export const kinematicsFlashcards: Flashcard[] = [
    {
      id: 1,
      question:
        "Why is the acceleration of a body moving in a circle at constant speed not zero?",
      answer:
        "Because its direction is continuously changing, resulting in centripetal acceleration toward the center.",
    },
    {
      id: 2,
      question:
        "A particle returns to its initial position in 10 seconds. What can be said about its displacement and distance?",
      answer:
        "Displacement is zero, but distance is the total path covered and non-zero.",
    },
    {
      id: 3,
      question:
        "How can a velocity-time graph help identify uniformly accelerated motion?",
      answer:
        "A straight line with constant non-zero slope on a velocity-time graph indicates uniform acceleration.",
    },
    {
      id: 4,
      question:
        "A body thrown upwards reaches maximum height in 2 seconds. What is its velocity at the top?",
      answer:
        "Zero. Velocity becomes zero momentarily at the highest point.",
    },
    {
      id: 5,
      question: "What does the area under a velocity-time graph represent?",
      answer: "Displacement. Area under the curve gives net displacement.",
    },
    {
      id: 6,
      question:
        "Under what condition is the average speed equal to the magnitude of average velocity?",
      answer:
        "When motion is in a straight line without change in direction.",
    },
    {
      id: 7,
      question:
        "Can a particle have zero velocity and non-zero acceleration? Give an example.",
      answer: "Yes, at the highest point of upward motion under gravity.",
    },
    {
      id: 8,
      question:
        "What is the condition for a particle to have uniform circular motion?",
      answer:
        "Speed must be constant and a constant centripetal force must act perpendicular to velocity.",
    },
    {
      id: 9,
      question:
        "How do we calculate relative velocity of two objects moving in the same direction?",
      answer: "V_rel = V₁ – V₂, taking direction into account.",
    },
    {
      id: 10,
      question:
        "A car accelerates from 0 to 60 m/s in 10 s. What is its acceleration?",
      answer: "a = Δv / Δt = 60 / 10 = 6 m/s²",
    },
    {
      id: 11,
      question:
        "Can the velocity of an object be perpendicular to its acceleration? Example?",
      answer:
        "Yes. In uniform circular motion, velocity and centripetal acceleration are always perpendicular.",
    },
    {
      id: 12,
      question: "What is instantaneous velocity?",
      answer:
        "Velocity of a particle at a specific instant of time; it is the slope of the tangent on a displacement-time graph.",
    },
    {
      id: 13,
      question: "How can a position-time graph show non-uniform motion?",
      answer:
        "If the graph is a curve (not a straight line), it shows changing velocity.",
    },
    {
      id: 14,
      question: "What is jerk in kinematics?",
      answer: "Rate of change of acceleration with time. Jerk = da/dt.",
    },
    {
      id: 15,
      question: "In projectile motion, what remains constant throughout?",
      answer:
        "Horizontal component of velocity (if air resistance is neglected).",
    },
    {
      id: 16,
      question:
        "A projectile is launched at 45°. How do you find time of flight?",
      answer: "T = (2u sinθ) / g; for θ = 45°, T = (2u / √2) / g.",
    },
    {
      id: 17,
      question:
        "A graph between displacement and time is a straight line inclined to the time axis. What does it indicate?",
      answer: "Uniform velocity.",
    },
    {
      id: 18,
      question: "What is the trajectory of a projectile?",
      answer: "It is a parabola.",
    },
    {
      id: 19,
      question: "What determines the range of a projectile?",
      answer:
        "Initial velocity, angle of projection, and acceleration due to gravity.",
    },
    {
      id: 20,
      question:
        "Why is vertical motion in projectile treated as uniformly accelerated motion?",
      answer: "Because gravity acts with constant acceleration downward.",
    },
    {
      id: 21,
      question:
        "At what angle of projection is the horizontal range maximum?",
      answer: "45°, assuming level ground and no air resistance.",
    },
    {
      id: 22,
      question: "What is the maximum height formula in projectile motion?",
      answer: "H = (u² sin²θ) / (2g)",
    },
    {
      id: 23,
      question: "What causes a change in velocity in non-uniform motion?",
      answer: "Change in speed or direction or both.",
    },
    {
      id: 24,
      question: "Define average velocity vectorially.",
      answer:
        "Average velocity = (Final position - Initial position) / Time interval.",
    },
    {
      id: 25,
      question:
        "What is the nature of the path of a particle under uniform acceleration at an angle?",
      answer: "Parabolic path, typical of projectile motion.",
    },
    {
      id: 26,
      question:
        "Is it possible for speed to remain constant while velocity changes?",
      answer: "Yes, in uniform circular motion.",
    },
    {
      id: 27,
      question:
        "What is the significance of the area under an acceleration-time graph?",
      answer: "It gives change in velocity.",
    },
    {
      id: 28,
      question:
        "What is the graphical method to derive equations of motion?",
      answer: "Using velocity-time graphs and areas under the curves.",
    },
    {
      id: 29,
      question: "Which equation of motion is independent of time?",
      answer: "v² = u² + 2as",
    },
    {
      id: 30,
      question:
        "If the velocity of a particle is zero at an instant, is its acceleration necessarily zero?",
      answer:
        "No. Acceleration could be non-zero, such as at the topmost point of projectile motion.",
    },
    {
      id: 31,
      question:
        "What is the relation between velocity and displacement in uniform acceleration?",
      answer:
        "v² = u² + 2as; relates final velocity, initial velocity, and displacement.",
    },
    {
      id: 32,
      question:
        "What does a horizontal line on a velocity-time graph represent?",
      answer: "Constant velocity.",
    },
    {
      id: 33,
      question: "What is the dimensional formula of acceleration?",
      answer: "[LT⁻²]",
    },
    {
      id: 34,
      question:
        "What is the net displacement if a body moves 4 m north, then 3 m south?",
      answer: "1 m north.",
    },
    {
      id: 35,
      question:
        "How does increasing projection angle affect the range of a projectile?",
      answer: "Range increases till 45°, then decreases.",
    },
    {
      id: 36,
      question:
        "What is the nature of acceleration in vertical projectile motion?",
      answer: "Constant, directed downward.",
    },
    {
      id: 37,
      question: "Is range affected by mass in projectile motion?",
      answer: "No, range is independent of mass (in ideal conditions).",
    },
    {
      id: 38,
      question:
        "Two projectiles are thrown at complementary angles. What can be said about their ranges?",
      answer: "They are equal if speeds are equal.",
    },
    {
      id: 39,
      question: "Can displacement ever be greater than distance?",
      answer:
        "No, distance is always greater than or equal to displacement.",
    },
    {
      id: 40,
      question: "Why is velocity a vector and speed a scalar?",
      answer:
        "Velocity has both magnitude and direction, speed has only magnitude.",
    },
    {
      id: 41,
      question:
        "What is the effect of changing projection angle on the maximum height of a projectile?",
      answer:
        "As angle increases from 0° to 90°, maximum height increases; it is maximum at 90°.",
    },
    {
      id: 42,
      question: "In what situation is the range of a projectile zero?",
      answer: "When it is projected vertically upward or downward.",
    },
    {
      id: 43,
      question:
        "A boy throws a stone vertically upward. Which kinematic equation helps find the max height?",
      answer: "v² = u² + 2as, using v = 0 at top.",
    },
    {
      id: 44,
      question:
        "How do you identify non-uniform acceleration from a velocity-time graph?",
      answer:
        "If the graph is a curve (not a straight line), it shows non-uniform acceleration.",
    },
    {
      id: 45,
      question:
        "Can two different velocity-time graphs give the same displacement?",
      answer: "Yes, if the area under both graphs is equal.",
    },
    {
      id: 46,
      question:
        "How do you represent acceleration graphically on a velocity-time graph?",
      answer: "It is the slope of the velocity-time graph.",
    },
    {
      id: 47,
      question:
        "How does air resistance affect the range and height of a projectile?",
      answer: "Both are reduced due to opposing drag force.",
    },
    {
      id: 48,
      question:
        "What happens to the time of flight if the projection velocity is doubled?",
      answer:
        "Time of flight becomes twice, since it depends linearly on velocity.",
    },
    {
      id: 49,
      question: "What type of motion is represented by a parabolic path?",
      answer: "Projectile motion under gravity.",
    },
    {
      id: 50,
      question: "Which component of velocity changes in projectile motion?",
      answer: "Vertical component due to gravity.",
    },
    {
      id: 51,
      question:
        "What are the initial velocity components for a projectile launched at angle θ?",
      answer: "u_x = u cosθ, u_y = u sinθ",
    },
    {
      id: 52,
      question:
        "How is motion in one dimension different from motion in two dimensions?",
      answer:
        "1D involves motion along a single axis; 2D involves motion in a plane requiring vector analysis.",
    },
    {
      id: 53,
      question:
        "In a displacement-time graph, what does a steeper slope indicate?",
      answer: "Higher velocity.",
    },
    {
      id: 54,
      question: "How does acceleration affect velocity?",
      answer:
        "Acceleration increases or decreases velocity depending on direction.",
    },
    {
      id: 55,
      question: "How do you derive range of a projectile using components?",
      answer:
        "Range R = (u² sin2θ) / g using horizontal velocity × time of flight.",
    },
    {
      id: 56,
      question:
        "Which graph shows uniformly accelerated motion starting from rest?",
      answer:
        "A straight line with positive slope on a velocity-time graph passing through origin.",
    },
    {
      id: 57,
      question:
        "How does range change if angle of projection is decreased from 60° to 30°?",
      answer:
        "Range increases (since 30° has a complementary pair closer to 45°).",
    },
    {
      id: 58,
      question: "Can velocity and acceleration be in opposite directions?",
      answer: "Yes, during retardation.",
    },
    {
      id: 59,
      question: "Why is vector representation crucial in 2D kinematics?",
      answer:
        "Because direction matters, especially when adding velocities or displacements.",
    },
    {
      id: 60,
      question: "What determines the curvature of a projectile's path?",
      answer:
        "Initial velocity, angle of projection, and gravitational pull.",
    },
    {
      id: 61,
      question:
        "If a body has uniform acceleration, what will its velocity-time graph look like?",
      answer: "A straight line with a constant slope.",
    },
    {
      id: 62,
      question:
        "How is relative velocity calculated when two bodies move in opposite directions?",
      answer: "Add their speeds: V_rel = V1 + V2.",
    },
    {
      id: 63,
      question:
        "In riverboat problems, what does the time of crossing depend on?",
      answer:
        "Width of the river and the velocity of the boat perpendicular to current.",
    },
    {
      id: 64,
      question:
        "What is the result of vector addition of two perpendicular velocities?",
      answer: "Use Pythagoras: v = √(v1² + v2²).",
    },
    {
      id: 65,
      question: "What happens to the net displacement in a round trip?",
      answer: "It becomes zero.",
    },
    {
      id: 66,
      question:
        "What does a negative slope on a displacement-time graph indicate?",
      answer: "The particle is moving in the opposite direction.",
    },
    {
      id: 67,
      question:
        "When is the magnitude of average velocity equal to average speed?",
      answer:
        "When motion is along a straight path without changing direction.",
    },
    {
      id: 68,
      question:
        "A ball dropped from a height hits the ground in 2 seconds. What is the height?",
      answer: "s = 0.5 × g × t² = 0.5 × 10 × 4 = 20 m.",
    },
    {
      id: 69,
      question:
        "What is the displacement of a particle moving with uniform acceleration in nth second?",
      answer: "s_n = u + a/2 × (2n - 1).",
    },
    {
      id: 70,
      question: "What is the graphical representation of retardation?",
      answer: "A velocity-time graph with negative slope.",
    },
    {
      id: 71,
      question:
        "Can acceleration be constant but not zero if speed is zero?",
      answer: "Yes, at the top of projectile motion.",
    },
    {
      id: 72,
      question:
        "What is the effect of doubling the projection speed on projectile range?",
      answer: "Range becomes 4 times since R ∝ u².",
    },
    {
      id: 73,
      question: "What is a time-symmetric path in projectile motion?",
      answer: "Ascent and descent take equal time and are symmetric.",
    },
    {
      id: 74,
      question: "What is the velocity at the highest point of projectile?",
      answer: "Equal to horizontal component: u cosθ.",
    },
    {
      id: 75,
      question:
        "How can you find range using time of flight and horizontal velocity?",
      answer: "R = u_x × T.",
    },
    {
      id: 76,
      question: "Why is distance always positive?",
      answer: "It’s a scalar and measures total path, not direction.",
    },
    {
      id: 77,
      question: "How can displacement be negative?",
      answer:
        "If final position is behind the starting point relative to chosen direction.",
    },
    {
      id: 78,
      question:
        "A particle's velocity is increasing and acceleration is negative. What does it mean?",
      answer:
        "The particle is slowing down; velocity and acceleration have opposite directions.",
    },
    {
      id: 79,
      question:
        "Which kinematic equation is used when displacement is unknown?",
      answer: "v = u + at.",
    },
    {
      id: 80,
      question:
        "How does initial velocity affect time of flight in vertical projectile?",
      answer: "Time of flight increases linearly with u.",
    },
    {
      id: 81,
      question:
        "What is the direction of acceleration in projectile motion?",
      answer: "Always vertically downward due to gravity.",
    },
    {
      id: 82,
      question: "What does the slope of a velocity-time graph represent?",
      answer: "Acceleration.",
    },
    {
      id: 83,
      question:
        "When does a body experience zero net displacement but non-zero total distance?",
      answer: "When it returns to its initial position.",
    },
    {
      id: 84,
      question:
        "How does the projection angle affect the shape of the projectile path?",
      answer: "Greater angle → higher arc, smaller angle → flatter arc.",
    },
    {
      id: 85,
      question:
        "If two projectiles are fired with same speed at angles θ and 90°–θ, what can be said about their ranges?",
      answer: "They will be equal.",
    },
    {
      id: 86,
      question: "What is the dimensional formula of velocity?",
      answer: "[LT⁻¹]",
    },
    {
      id: 87,
      question:
        "In river-boat problems, what is the resultant velocity of the boat?",
      answer: "Vector sum of boat’s velocity and river current.",
    },
    {
      id: 88,
      question:
        "What does the area under an acceleration-time graph indicate?",
      answer: "Change in velocity.",
    },
    {
      id: 89,
      question: "How is instantaneous acceleration calculated graphically?",
      answer: "It is the slope of the tangent on a velocity-time graph.",
    },
    {
      id: 90,
      question:
        "What are the SI units of displacement, velocity, and acceleration?",
      answer:
        "Meter (m), meter per second (m/s), meter per second squared (m/s²).",
    },
    {
      id: 91,
      question: "Why do projectiles follow a curved path?",
      answer:
        "Due to simultaneous horizontal motion and downward acceleration.",
    },
    {
      id: 92,
      question:
        "What will the velocity-time graph of a freely falling body from rest look like?",
      answer: "A straight line with positive slope equal to g.",
    },
    {
      id: 93,
      question: "What causes a change in direction in projectile motion?",
      answer: "The vertical acceleration due to gravity.",
    },
    {
      id: 94,
      question:
        "If a stone is projected horizontally, what is its vertical initial velocity?",
      answer: "Zero.",
    },
    {
      id: 95,
      question:
        "How does acceleration vary with time in uniform acceleration?",
      answer: "It remains constant.",
    },
    {
      id: 96,
      question:
        "A particle moves in a straight line with changing velocity. What type of motion is it?",
      answer: "Non-uniform rectilinear motion.",
    },
    {
      id: 97,
      question:
        "How do you find net displacement in 2D motion using vectors?",
      answer: "Use the Pythagorean theorem on x and y components.",
    },
    {
      id: 98,
      question:
        "What is the nature of acceleration in free fall near Earth?",
      answer: "It is constant and equal to g (≈ 9.8 m/s² downward).",
    },
    {
      id: 99,
      question: "What is the relation between displacement and distance?",
      answer: "Displacement ≤ Distance always.",
    },
    {
      id: 100,
      question:
        "In projectile motion, what is the net velocity at the topmost point?",
      answer: "Equal to the horizontal component of initial velocity.",
    },
];

export const forcesFlashcards: Flashcard[] = [
    {
      id: 1,
      question:
        "A block is on a rough horizontal surface and a force is applied at an angle. Why might the block not move even if F > μN?",
      answer:
        "The normal force changes due to the vertical component of F; μN is not constant.",
    },
    {
      id: 2,
      question:
        "In a two-block system with tension, why is acceleration not the same when surfaces have friction?",
      answer:
        "Friction introduces different net forces; both blocks respond differently unless they are constrained.",
    },
    {
      id: 3,
      question:
        "A block is placed on a wedge and the wedge is accelerated horizontally. What condition makes the block stationary relative to the wedge?",
      answer: "a = g·tanθ, where θ is the angle of the wedge.",
    },
    {
      id: 4,
      question:
        "In an elevator accelerating upward, what is the normal reaction on a person?",
      answer: "N = m(g + a); apparent weight increases.",
    },
    {
      id: 5,
      question: "Why is pseudo force applied in non-inertial frames?",
      answer:
        "To make Newton's Second Law applicable from a non-inertial frame of reference.",
    },
    {
      id: 6,
      question:
        "If a body is in equilibrium under three forces, what must be true geometrically?",
      answer:
        "The forces must be concurrent and form a closed triangle (Lami’s Theorem).",
    },
    {
      id: 7,
      question:
        "What is the net force on a block sliding down a rough incline at constant speed?",
      answer: "Zero, as kinetic friction balances component of gravity.",
    },
    {
      id: 8,
      question:
        "Two blocks A and B are connected by a string over a pulley, A on a table. Why does friction not always act opposite to motion?",
      answer: "Friction always opposes *relative* motion, not net motion.",
    },
    {
      id: 9,
      question:
        "Block A is on B, and B is on a smooth surface. A force is applied on B. Why might A slide on B?",
      answer:
        "If force exceeds limiting friction between A and B, relative motion begins.",
    },
    {
      id: 10,
      question:
        "A car takes a turn on a level road. What is the source of centripetal force?",
      answer: "Static friction between tyres and road.",
    },
    {
      id: 11,
      question:
        "In a pulley system with friction on a table, how does friction affect tension?",
      answer:
        "It reduces the net force needed to move the block, thus reducing tension on that side.",
    },
    {
      id: 12,
      question:
        "Block A is stacked on block B. B is pulled. What must be true to avoid slipping of A?",
      answer:
        "Friction between A and B must provide enough acceleration: f ≤ μN and a ≤ μg.",
    },
    {
      id: 13,
      question:
        "When can normal reaction be zero even when the object is in contact?",
      answer:
        "If the surface accelerates downward faster than g or if the object is in a pseudo-free fall.",
    },
    {
      id: 14,
      question:
        "A block is kept against a wall and a horizontal force is applied. What keeps the block from falling?",
      answer:
        "Static friction acting vertically upward counters gravity; normal reaction is due to applied force.",
    },
    {
      id: 15,
      question:
        "In a system with two pulleys and three masses, how do you approach finding accelerations?",
      answer:
        "Use constraints from strings and apply Newton’s Second Law for each mass separately.",
    },
    {
      id: 16,
      question:
        "What causes pseudo force in a non-inertial frame, and what is its direction?",
      answer:
        "It arises from acceleration of the frame and acts opposite to that acceleration on every mass.",
    },
    {
      id: 17,
      question: "Why is kinetic friction independent of velocity?",
      answer:
        "Because kinetic friction depends only on the nature of surfaces and normal force, not speed.",
    },
    {
      id: 18,
      question:
        "A block is projected up a rough incline. Where does friction act?",
      answer: "Down the incline, opposing upward motion of the block.",
    },
    {
      id: 19,
      question:
        "A block is sliding down a rough incline. Where does friction act?",
      answer: "Up the incline, opposing the motion.",
    },
    {
      id: 20,
      question:
        "Two blocks are connected on an incline by a string. How does friction influence motion?",
      answer:
        "It alters net force on each block and may affect whether motion occurs or remains static.",
    },
    {
      id: 21,
      question:
        "A coin placed on a rotating disc flies off tangentially. Why?",
      answer:
        "No sufficient static friction to provide required centripetal force, so it moves tangentially.",
    },
    {
      id: 22,
      question: "Can friction do positive work?",
      answer:
        "Yes, in cases like walking, where friction enables forward motion.",
    },
    {
      id: 23,
      question:
        "In circular motion on a banked road, what happens if there's no friction?",
      answer:
        "Banking alone provides the necessary centripetal force at one particular speed.",
    },
    {
      id: 24,
      question:
        "Block on wedge problem: What does it mean if normal reaction becomes zero?",
      answer:
        "The body is losing contact with the surface—possibly airborne.",
    },
    {
      id: 25,
      question: "Can friction ever increase acceleration?",
      answer:
        "Yes, in rolling without slipping or when a block pushes another, friction can help transmit force.",
    },
    {
      id: 26,
      question:
        "On an incline, a body is at rest. What direction does static friction act?",
      answer: "Up the incline, opposing tendency to slide down.",
    },
    {
      id: 27,
      question:
        "Two masses on opposite sides of pulley, one on a rough surface. How to approach acceleration?",
      answer:
        "Draw FBDs, apply Newton's law including friction, and use tension + constraint equations.",
    },
    {
      id: 28,
      question:
        "A rope pulls a block at an angle θ with friction. Why does friction sometimes increase with θ?",
      answer:
        "Vertical component of tension reduces normal reaction, affecting friction magnitude.",
    },
    {
      id: 29,
      question: "When can the frictional force be zero despite contact?",
      answer:
        "If there’s no relative tendency of motion and no external force along the surface.",
    },
    {
      id: 30,
      question:
        "What is the key assumption in frictional force calculations in JEE problems?",
      answer:
        "That limiting friction is not exceeded unless explicitly stated; static friction ≤ μN.",
    },
    {
      id: 31,
      question:
        "Block A is on a smooth wedge. Wedge is accelerated horizontally. What must be the minimum acceleration to keep A stuck to the wedge?",
      answer: "a_min = g·tanθ",
    },
    {
      id: 32,
      question:
        "What is the common error when analyzing tension in a frictional pulley system?",
      answer:
        "Assuming tension is equal on both sides even when friction or mass of pulley exists.",
    },
    {
      id: 33,
      question:
        "How do you determine direction of friction in rolling without slipping?",
      answer:
        "Use torque and net acceleration; friction opposes relative slipping, not motion.",
    },
    {
      id: 34,
      question:
        "A man stands in an accelerating lift. What is his apparent weight if the lift accelerates downward?",
      answer: "Apparent weight = m(g - a)",
    },
    {
      id: 35,
      question:
        "What is the force required to keep a block pressed against a vertical wall using only horizontal force?",
      answer: "F ≥ mg/μ (where μ is coefficient of static friction)",
    },
    {
      id: 36,
      question:
        "A block is at rest inside a lift accelerating downward. What direction is the pseudo force?",
      answer: "Upward, opposite to lift's acceleration.",
    },
    {
      id: 37,
      question:
        "Why can friction be treated as an internal constraint in certain systems?",
      answer:
        "Because it enforces rolling/no-slipping without appearing as an external work-producing force.",
    },
    {
      id: 38,
      question:
        "How does tension transmit force in multi-block systems with friction?",
      answer:
        "It acts like a force chain, distributing net applied force minus friction among blocks.",
    },
    {
      id: 39,
      question:
        "What determines whether an object remains stationary on a moving surface?",
      answer:
        "Whether pseudo force can be balanced by maximum static friction.",
    },
    {
      id: 40,
      question:
        "How does friction act in circular motion on a banked surface when car speed is below ideal?",
      answer: "Up the incline, providing additional centripetal force.",
    },
    {
      id: 41,
      question:
        "When does kinetic friction exceed static friction in a problem setup?",
      answer:
        "It never does; static friction is always ≥ kinetic friction. If it seems otherwise, recheck assumptions.",
    },
    {
      id: 42,
      question:
        "In solving pulley-block systems, why must constraint equations be used?",
      answer:
        "They link the accelerations of different masses due to connected motion.",
    },
    {
      id: 43,
      question:
        "How to decide direction of pseudo force in inclined plane inside accelerating lift?",
      answer:
        "Same direction as the opposite of acceleration of the lift, resolve pseudo force along incline.",
    },
    {
      id: 44,
      question:
        "Block pushed up a rough incline with force at angle. Why can friction reverse during motion?",
      answer:
        "As direction of relative motion changes (up vs. down), so does friction.",
    },
    {
      id: 45,
      question: "What makes friction a non-conservative force?",
      answer:
        "Work done by friction depends on path and always results in mechanical energy loss.",
    },
    {
      id: 46,
      question: "Is the work done by tension always positive in a system?",
      answer:
        "No, depends on direction of displacement; in pulleys, it can be negative for one mass.",
    },
    {
      id: 47,
      question:
        "In a block-on-block system, what happens if the lower block is given a jerk?",
      answer:
        "The upper block may lag momentarily, leading to slipping if friction is insufficient.",
    },
    {
      id: 48,
      question:
        "How does friction influence equilibrium of L-shaped or extended objects?",
      answer:
        "It provides torque in addition to force balance, crucial in rotational equilibrium.",
    },
    {
      id: 49,
      question:
        "Why is it wrong to apply Newton's third law between friction and normal force?",
      answer:
        "They are different components of the contact force and act on the same body.",
    },
    {
      id: 50,
      question:
        "What causes a sudden change in frictional force during rolling to sliding transition?",
      answer:
        "Loss of static contact means kinetic friction takes over, causing sharp deceleration.",
    },
    {
      id: 51,
      question:
        "In vertical circular motion, what is the minimum speed required at the top of the loop for a body to stay in contact?",
      answer: "v_min = √(gR), where R is radius of the loop.",
    },
    {
      id: 52,
      question:
        "What happens to tension at the top of vertical circular motion at minimum speed?",
      answer:
        "It becomes zero; normal force just vanishes to maintain contact.",
    },
    {
      id: 53,
      question:
        "A block slides off a moving wedge. Why is acceleration of the block not equal to g sinθ?",
      answer:
        "Because the wedge is also accelerating; relative motion changes net effective acceleration.",
    },
    {
      id: 54,
      question:
        "In variable mass systems (like a leaking cart), does Newton's second law still hold as F = ma?",
      answer: "No, use F = d(mv)/dt = m·a + v·dm/dt",
    },
    {
      id: 55,
      question:
        "Why is friction not necessarily present even if surfaces are rough?",
      answer:
        "Friction only acts if there's a tendency of relative motion.",
    },
    {
      id: 56,
      question:
        "In a problem with multiple contact surfaces, how do you decide direction of contact force?",
      answer:
        "Use FBDs and check which way motion or pseudo force tries to push each body.",
    },
    {
      id: 57,
      question:
        "What concept helps simplify pulley systems on inclined planes with friction?",
      answer:
        "Use net effective force along incline and constraint acceleration relationships.",
    },
    {
      id: 58,
      question:
        "A monkey climbs a rope attached to a pulley. What additional concept must be considered?",
      answer:
        "Variable tension due to monkey’s acceleration and motion relative to the rope.",
    },
    {
      id: 59,
      question:
        "A mass hangs from a pulley system in a lift. How does lift’s motion affect tension?",
      answer:
        "Upward acceleration increases tension, downward decreases it.",
    },
    {
      id: 60,
      question: "Why do problems often neglect mass of pulley or string?",
      answer:
        "To keep tension same throughout and avoid rotational dynamics.",
    },
    {
      id: 61,
      question: "Can friction act perpendicular to motion?",
      answer:
        "Yes, in circular motion it acts radially inward (centripetal).",
    },
    {
      id: 62,
      question: "What makes static friction a variable force?",
      answer:
        "It adjusts to oppose relative motion, up to a maximum limit (μN).",
    },
    {
      id: 63,
      question:
        "What happens if net external force is zero but internal tension exists?",
      answer:
        "System may remain at rest or move uniformly; internal forces don't affect CM motion.",
    },
    {
      id: 64,
      question:
        "A block is pushed against a rough wall with variable force. How does friction vary?",
      answer:
        "Friction increases until limiting value is reached, then block slips.",
    },
    {
      id: 65,
      question:
        "How does rope tension distribute in pulleys when the rope is non-massless?",
      answer:
        "Tension becomes unequal across the rope due to internal mass segments.",
    },
    {
      id: 66,
      question: "Is normal reaction always perpendicular to surface?",
      answer: "Yes, by definition of contact force components.",
    },
    {
      id: 67,
      question: "Can the friction force be more than μN in any situation?",
      answer: "No, static friction ≤ μN; kinetic friction = μkN always.",
    },
    {
      id: 68,
      question:
        "What is the condition for zero acceleration in multi-body horizontal systems with friction?",
      answer: "Net applied force = total frictional resistance.",
    },
    {
      id: 69,
      question:
        "In vertical pulley problems with unequal masses, what causes motion?",
      answer: "Difference in weights creates net unbalanced force.",
    },
    {
      id: 70,
      question:
        "Why can’t you apply Newton’s third law between components of same force (like friction and normal)?",
      answer:
        "They are orthogonal components of the same contact force, not a third-law pair.",
    },
    {
      id: 71,
      question:
        "In a two-body system, why is internal friction irrelevant for center of mass acceleration?",
      answer:
        "Internal forces cancel out when applying Newton’s second law to the system as a whole.",
    },
    {
      id: 72,
      question:
        "Why does a body experience backward pseudo force in a forward-accelerating car?",
      answer:
        "Because the car is a non-inertial frame; pseudo force acts opposite to its acceleration.",
    },
    {
      id: 73,
      question:
        "A small block is placed on a larger block. The system accelerates. What determines the friction direction on the smaller block?",
      answer:
        "Relative tendency — friction acts to make small block follow large block (forward).",
    },
    {
      id: 74,
      question:
        "What is the maximum acceleration of a block so that another block on top doesn't slip?",
      answer:
        "a ≤ μg, where μ is coefficient of friction between surfaces.",
    },
    {
      id: 75,
      question:
        "What happens to normal force when a block is on a rough incline and an external force pushes it into the plane?",
      answer:
        "Normal force increases, increasing maximum static friction possible.",
    },
    {
      id: 76,
      question:
        "Is tension always equal in a single massless pulley system?",
      answer:
        "Only if pulley is ideal (massless and frictionless); otherwise, tension differs.",
    },
    {
      id: 77,
      question:
        "Can a block remain stationary on a wedge placed in a horizontally accelerating truck?",
      answer:
        "Yes, if horizontal pseudo force balances component of gravity: a = g·tanθ.",
    },
    {
      id: 78,
      question:
        "Why must friction be considered even when there's no actual motion?",
      answer:
        "To oppose *tendency* of motion — key idea in static friction.",
    },
    {
      id: 79,
      question:
        "How do you identify if a block will slip in multi-surface systems?",
      answer:
        "Compare required frictional force (from equations) to limiting friction (μN).",
    },
    {
      id: 80,
      question:
        "A particle inside a rotating ring remains stuck. What provides centripetal force?",
      answer:
        "Friction between the ring and particle acts radially inward.",
    },
    {
      id: 81,
      question:
        "If friction is limiting and object moves at constant speed, is net force zero?",
      answer: "Yes; applied force is exactly balancing kinetic friction.",
    },
    {
      id: 82,
      question: "Why do light pulleys simplify tension analysis?",
      answer:
        "They ensure equal tension on both sides of the pulley, allowing easier equations.",
    },
    {
      id: 83,
      question: "Can pseudo force be greater than real forces in a system?",
      answer:
        "Yes, especially when analyzing from a strongly accelerating non-inertial frame.",
    },
    {
      id: 84,
      question:
        "Two blocks on each other on an incline are tied with a string. What determines tension?",
      answer:
        "Tension adjusts to balance differential tendencies due to gravity and friction.",
    },
    {
      id: 85,
      question:
        "A block is attached to a spring on a rough surface. What role does friction play in SHM?",
      answer:
        "It can limit or prevent oscillations if it exceeds spring restoring force.",
    },
    {
      id: 86,
      question:
        "What causes loss of contact at the top of vertical circular motion?",
      answer:
        "If centripetal force is less than mg, normal force becomes negative, i.e., no contact.",
    },
    {
      id: 87,
      question:
        "Why is constraint motion key in multi-body friction problems?",
      answer:
        "It provides relations between accelerations which reduce variables in equations.",
    },
    {
      id: 88,
      question:
        "In a block-and-wedge system, why is wedge acceleration sometimes independent of mass?",
      answer:
        "Due to symmetry and conservation of horizontal momentum in frictionless setups.",
    },
    {
      id: 89,
      question:
        "What is the cause of reaction forces in Newton's Third Law pair?",
      answer:
        "They arise due to mutual interactions and exist simultaneously, regardless of motion.",
    },
    {
      id: 90,
      question:
        "Why do students often misapply F = ma in non-inertial frames?",
      answer:
        "Because they forget to add pseudo force for frame acceleration; F = ma only holds in inertial frames.",
    },
    {
      id: 91,
      question:
        "Two blocks are pushed by a force F. Which block experiences more friction if they have different masses but same surface?",
      answer: "The heavier block, as friction = μN = μmg.",
    },
    {
      id: 92,
      question:
        "Why does a block-on-block system sometimes experience unequal acceleration despite being in contact?",
      answer:
        "Relative motion occurs due to insufficient friction or external constraint differences.",
    },
    {
      id: 93,
      question:
        "What happens to impulse when a block hits a rough wall and rebounds?",
      answer:
        "Normal impulse changes momentum; frictional impulse changes angular motion if rotation exists.",
    },
    {
      id: 94,
      question:
        "What indicates a violation of Newton's Third Law in a student’s solution?",
      answer:
        "If action and reaction are shown acting on same body or producing unequal results.",
    },
    {
      id: 95,
      question:
        "Block on rough surface is pulled by string. What force determines the direction of acceleration?",
      answer:
        "Net force = T - friction. Direction depends on whether T > μN or not.",
    },
    {
      id: 96,
      question:
        "Why can't you directly compare magnitudes of contact forces without full FBD?",
      answer:
        "Forces can have multiple components (normal and friction), and direction changes the net effect.",
    },
    {
      id: 97,
      question:
        "What is a common error while analyzing ring-pulley systems in circular motion?",
      answer:
        "Ignoring centripetal acceleration requirement for the rotating mass or misapplying radial force balance.",
    },
    {
      id: 98,
      question:
        "In block-pulley-wedge systems, what introduces complexity in normal forces?",
      answer:
        "Incline angles change reaction directions; tension and pseudo force affect net perpendicular contact.",
    },
    {
      id: 99,
      question:
        "Why does a block placed near edge of a plank slip when plank accelerates suddenly?",
      answer:
        "Friction isn't sufficient to match plank's acceleration — relative motion begins.",
    },
    {
      id: 100,
      question:
        "How do you handle frame shift in problems with moving platforms?",
      answer:
        "Apply pseudo force in non-inertial frame or solve in inertial frame with constraint accelerations.",
    },
    {
      id: 101,
      question:
        "A solid sphere rolls down an incline. Why is friction necessary even if there’s no slipping?",
      answer:
        "Static friction provides torque for rolling motion; without it, the sphere would slide.",
    },
    {
      id: 102,
      question:
        "How do you decide direction of friction in rolling objects on an incline?",
      answer:
        "If object accelerates more than required for pure rolling, friction acts opposite to motion; otherwise, along motion.",
    },
    {
      id: 103,
      question:
        "In ladder problems, what conditions must be satisfied to ensure equilibrium?",
      answer:
        "Balance of horizontal forces, vertical forces, and torque (∑Fx = 0, ∑Fy = 0, ∑τ = 0).",
    },
    {
      id: 104,
      question:
        "A ladder leans against a smooth wall. What provides horizontal equilibrium?",
      answer: "Friction at the base of the ladder.",
    },
    {
      id: 105,
      question:
        "In conical pendulum, what provides the required centripetal force?",
      answer: "The horizontal component of the tension in the string.",
    },
    {
      id: 106,
      question:
        "Can D'Alembert’s principle be used for non-inertial frames?",
      answer:
        "Yes, by treating pseudo force as real, allowing F - ma = 0 (dynamic equilibrium).",
    },
    {
      id: 107,
      question:
        "If coefficient of friction varies with position (μ = kx), how does motion change?",
      answer:
        "The resistive force becomes position dependent, complicating force equations and trajectory.",
    },
    {
      id: 108,
      question:
        "Two masses hang over a pulley, one on a platform in a lift. How is acceleration affected?",
      answer:
        "Lift's acceleration modifies normal force, altering net force on one side of the system.",
    },
    {
      id: 109,
      question:
        "A disc is spinning on a rough surface. What causes it to stop spinning?",
      answer:
        "Kinetic friction exerts torque opposite to spin, dissipating rotational energy.",
    },
    {
      id: 110,
      question: "Can static friction do work in a rolling object?",
      answer:
        "Yes, relative to ground it does work; but at point of contact, it doesn’t do work.",
    },
    {
      id: 111,
      question:
        "A block rests on a rotating disc. What condition ensures the block doesn't slip?",
      answer:
        "Friction must be ≥ required centripetal force: μmg ≥ mω²r ⇒ ω² ≤ μg/r.",
    },
    {
      id: 112,
      question:
        "In a rotating frame, what pseudo force acts on a particle?",
      answer: "Centrifugal force: mω²r outward from axis of rotation.",
    },
    {
      id: 113,
      question: "What is Coriolis force and when is it significant?",
      answer:
        "F_cor = 2mv × ω, significant in rotating frames (Earth), affects path curvature.",
    },
    {
      id: 114,
      question:
        "A rod leans on a wall and starts to slip. What causes the top end to lose contact first?",
      answer:
        "Reduction of normal force at the wall to zero due to torque imbalance and gravity.",
    },
    {
      id: 115,
      question:
        "Block placed inside a hemispherical shell starts slipping at certain angle. What gives the angle?",
      answer:
        "Set mg sinθ = μ mg cosθ ⇒ tanθ = μ; gives limiting angle of contact.",
    },
    {
      id: 116,
      question:
        "A body is in circular motion with constant speed. Is there any net force? Work done?",
      answer:
        "Yes, net centripetal force acts. But work done = 0 since force ⊥ displacement at all times.",
    },
    {
      id: 117,
      question: "What causes overestimation of friction in wedge problems?",
      answer:
        "Neglecting pseudo force when solving from non-inertial frame of the wedge.",
    },
    {
      id: 118,
      question: "What happens if pulley has mass but no friction at axle?",
      answer:
        "Tension differs on both sides, and rotational motion must be included.",
    },
    {
      id: 119,
      question: "Can static friction act downward on a surface?",
      answer:
        "Yes, e.g., in vertical wall problems where friction balances upward applied forces.",
    },
    {
      id: 120,
      question:
        "What does zero net torque imply in equilibrium conditions?",
      answer:
        "Either system is at rest or rotating with constant angular velocity.",
    },
    {
      id: 121,
      question:
        "In a multi-pulley Atwood machine, what must be conserved for accurate tension analysis?",
      answer:
        "Constraint relations (via string lengths) and total mechanical energy if frictionless.",
    },
    {
      id: 122,
      question: "Why does tension vary in a compound pulley with mass?",
      answer:
        "Because the pulley has rotational inertia, causing unequal tension on either side.",
    },
    {
      id: 123,
      question:
        "In a system of three blocks in contact on a table, how to find force on the middle block?",
      answer:
        "Use FBD of individual blocks; middle block experiences forces from both neighbors via friction/contact.",
    },
    {
      id: 124,
      question:
        "How does the presence of friction alter the net normal force in wedge problems?",
      answer:
        "Friction has vertical component (when not horizontal surface), modifying N due to its vector direction.",
    },
    {
      id: 125,
      question:
        "What’s the effect of adding a massless rod between two blocks pushed from one side?",
      answer:
        "It transmits compressive force; constraints must match displacements on both sides.",
    },
    {
      id: 126,
      question:
        "How do you deal with friction in pulley-on-incline questions?",
      answer:
        "Account for rolling/rotational dynamics of pulley and friction direction due to tendency of slipping.",
    },
    {
      id: 127,
      question:
        "Why do normal forces sometimes appear greater than weight in horizontal systems?",
      answer:
        "Because frictional interaction or external vertical forces (like pseudo forces) modify net vertical balance.",
    },
    {
      id: 128,
      question:
        "Block A over B, B on surface. Force applied on B. What limits block A from slipping?",
      answer:
        "Static friction between A and B must be enough to accelerate A with B.",
    },
    {
      id: 129,
      question:
        "When is it valid to treat multiple objects as one system for Newton’s Second Law?",
      answer:
        "When internal forces (tension/friction) are not of interest or do not affect net external force analysis.",
    },
    {
      id: 130,
      question:
        "Why does adding mass on a plank reduce its tendency to slip on a wedge?",
      answer:
        "More mass increases normal force ⇒ higher limiting static friction ⇒ more resistance to slipping.",
    },
  ];

      // App state
      let currentCardIndex = 0;
      let isFlipped = false;
      let cardStatuses = {};
      let availableCards = [];
      let shuffledCards = [];

      // Shuffle array function
      function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      }

      // Initialize app
      function initializeApp() {
        loadCardStatuses();
        shuffledCards = shuffleArray(flashcardData);
        updateAvailableCards();
        displayCurrentCard();
        updateUI();

        // Load theme preference
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
      }

      // Load card statuses from localStorage
      function loadCardStatuses() {
        const saved = localStorage.getItem("flashcardStatuses");
        cardStatuses = saved ? JSON.parse(saved) : {};
      }

      // Save card statuses to localStorage
      function saveCardStatuses() {
        localStorage.setItem("flashcardStatuses", JSON.stringify(cardStatuses));
      }

      // Update available cards (exclude done cards)
      function updateAvailableCards() {
        availableCards = shuffledCards.filter(
          (card) => cardStatuses[card.id] !== "done"
        );

        // Reset current index if it's out of bounds
        if (currentCardIndex >= availableCards.length) {
          currentCardIndex = Math.max(0, availableCards.length - 1);
        }
      }

      // Display current card
      function displayCurrentCard() {
        const container = document.getElementById("flashcardContainer");

        if (availableCards.length === 0) {
          container.innerHTML = `
                                                                                                <div class="empty-state">
                                                                                                    <h2>🎉 Congratulations!</h2>
                                                                                                    <p>You've completed all flashcards. Click "Reset Progress" to start over.</p>
                                                                                                </div>
                                                                                            `;
          return;
        }

        const card = availableCards[currentCardIndex];
        const isMarkedForLater = cardStatuses[card.id] === "later";

        container.innerHTML = `
                                                                                            <div class="flashcard ${
                                                                                              isFlipped
                                                                                                ? "flipped"
                                                                                                : ""
                                                                                            }" onclick="flipCard()">
                                                                                                <div class="flashcard-inner">
                                                                                                    <div class="flashcard-content">
                                                                                                        <div class="flashcard-question">${
                                                                                                          card.question
                                                                                                        }</div>
                                                                                                        <div class="flip-hint">Click to reveal answer</div>
                                                                                                        ${
                                                                                                          isMarkedForLater
                                                                                                            ? '<div style="position: absolute; top: 1rem; right: 1rem; background: var(--warning); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem;">⏰ See Later</div>'
                                                                                                            : ""
                                                                                                        }
                                                                                                    </div>
                                                                                                    <div class="flashcard-content flashcard-back">
                                                                                                        <div class="flashcard-answer">${
                                                                                                          card.answer
                                                                                                        }</div>
                                                                                                        <div class="flip-hint">Click to see question</div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        `;
      }

      // Flip card
      function flipCard() {
        isFlipped = !isFlipped;
        const flashcard = document.querySelector(".flashcard");
        if (flashcard) {
          flashcard.classList.toggle("flipped", isFlipped);
        }
      }

      // Navigate to next card
      function nextCard() {
        if (currentCardIndex < availableCards.length - 1) {
          currentCardIndex++;
          isFlipped = false;
          displayCurrentCard();
          updateUI();
        }
      }

      // Navigate to previous card
      function previousCard() {
        if (currentCardIndex > 0) {
          currentCardIndex--;
          isFlipped = false;
          displayCurrentCard();
          updateUI();
        }
      }

      // Mark card as done
      function markAsDone() {
        if (availableCards.length === 0) return;

        const card = availableCards[currentCardIndex];
        cardStatuses[card.id] = "done";
        saveCardStatuses();
        updateAvailableCards();

        // Move to next card or adjust index
        if (
          currentCardIndex >= availableCards.length &&
          availableCards.length > 0
        ) {
          currentCardIndex = availableCards.length - 1;
        }

        isFlipped = false;
        displayCurrentCard();
        updateUI();
      }

      // Mark card for later
      function markForLater() {
        if (availableCards.length === 0) return;

        const card = availableCards[currentCardIndex];
        cardStatuses[card.id] = "later";
        saveCardStatuses();
        displayCurrentCard();
        updateUI();
      }

      // Reset progress
      function resetProgress() {
        cardStatuses = {};
        saveCardStatuses();
        currentCardIndex = 0;
        isFlipped = false;
        shuffledCards = shuffleArray(flashcardData); // Re-shuffle when resetting
        updateAvailableCards();
        displayCurrentCard();
        updateUI();
      }

      // Update UI elements
      function updateUI() {
        const cardCounter = document.getElementById("cardCounter");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const progressFill = document.getElementById("progressFill");

        if (availableCards.length === 0) {
          cardCounter.textContent = "0 / 0";
          prevBtn.disabled = true;
          nextBtn.disabled = true;
          progressFill.style.width = "100%";
          return;
        }

        cardCounter.textContent = `${currentCardIndex + 1} / ${
          availableCards.length
        }`;
        prevBtn.disabled = currentCardIndex === 0;
        nextBtn.disabled = currentCardIndex === availableCards.length - 1;

        const completedCards = flashcardData.length - availableCards.length;
        const progress = (completedCards / flashcardData.length) * 100;
        progressFill.style.width = `${progress}%`;
      }

      // Toggle theme
      function toggleTheme() {
        const current = document.documentElement.getAttribute("data-theme");
        const newTheme = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }

      // Keyboard navigation
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          previousCard();
        } else if (e.key === "ArrowRight") {
          nextCard();
        } else if (e.key === " ") {
          e.preventDefault();
          flipCard();
        }
      });

      // Initialize app when page loads
      document.addEventListener("DOMContentLoaded", initializeApp);
    </script>
  </body>
</html>