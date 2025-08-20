
import type { Flashcard } from '../types';

export const kinematicsFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "Why is the acceleration of a body moving in a circle at constant speed not zero?",
        answer: "Because its direction is continuously changing, resulting in centripetal acceleration toward the center.",
    },
    {
        question: "A particle returns to its initial position in 10 seconds. What can be said about its displacement and distance?",
        answer: "Displacement is zero, but distance is the total path covered and non-zero.",
    },
    {
        question: "How can a velocity-time graph help identify uniformly accelerated motion?",
        answer: "A straight line with constant non-zero slope on a velocity-time graph indicates uniform acceleration.",
    },
    {
        question: "A body thrown upwards reaches maximum height in 2 seconds. What is its velocity at the top?",
        answer: "Zero. Velocity becomes zero momentarily at the highest point.",
    },
    {
        question: "What does the area under a velocity-time graph represent?",
        answer: "Displacement. Area under the curve gives net displacement.",
    },
    {
        question: "Under what condition is the average speed equal to the magnitude of average velocity?",
        answer: "When motion is in a straight line without change in direction.",
    },
    {
        question: "Can a particle have zero velocity and non-zero acceleration? Give an example.",
        answer: "Yes, at the highest point of upward motion under gravity.",
    },
    {
        question: "What is the condition for a particle to have uniform circular motion?",
        answer: "Speed must be constant and a constant centripetal force must act perpendicular to velocity.",
    },
    {
        question: "How do we calculate relative velocity of two objects moving in the same direction?",
        answer: "V_rel = V₁ – V₂, taking direction into account.",
    },
    {
        question: "A car accelerates from 0 to 60 m/s in 10 s. What is its acceleration?",
        answer: "a = Δv / Δt = 60 / 10 = 6 m/s²",
    },
    {
        question: "Can the velocity of an object be perpendicular to its acceleration? Example?",
        answer: "Yes. In uniform circular motion, velocity and centripetal acceleration are always perpendicular.",
    },
    {
        question: "What is instantaneous velocity?",
        answer: "Velocity of a particle at a specific instant of time; it is the slope of the tangent on a displacement-time graph.",
    },
    {
        question: "How can a position-time graph show non-uniform motion?",
        answer: "If the graph is a curve (not a straight line), it shows changing velocity.",
    },
    {
        question: "What is jerk in kinematics?",
        answer: "Rate of change of acceleration with time. Jerk = da/dt.",
    },
    {
        question: "In projectile motion, what remains constant throughout?",
        answer: "Horizontal component of velocity (if air resistance is neglected).",
    },
    {
        question: "A projectile is launched at 45°. How do you find time of flight?",
        answer: "T = (2u sinθ) / g; for θ = 45°, T = (2u / √2) / g.",
    },
    {
        question: "A graph between displacement and time is a straight line inclined to the time axis. What does it indicate?",
        answer: "Uniform velocity.",
    },
    {
        question: "What is the trajectory of a projectile?",
        answer: "It is a parabola.",
    },
    {
        question: "What determines the range of a projectile?",
        answer: "Initial velocity, angle of projection, and acceleration due to gravity.",
    },
    {
        question: "Why is vertical motion in projectile treated as uniformly accelerated motion?",
        answer: "Because gravity acts with constant acceleration downward.",
    },
    {
        question: "At what angle of projection is the horizontal range maximum?",
        answer: "45°, assuming level ground and no air resistance.",
    },
    {
        question: "What is the maximum height formula in projectile motion?",
        answer: "H = (u² sin²θ) / (2g)",
    },
    {
        question: "What causes a change in velocity in non-uniform motion?",
        answer: "Change in speed or direction or both.",
    },
    {
        question: "Define average velocity vectorially.",
        answer: "Average velocity = (Final position - Initial position) / Time interval.",
    },
    {
        question: "What is the nature of the path of a particle under uniform acceleration at an angle?",
        answer: "Parabolic path, typical of projectile motion.",
    },
    {
        question: "Is it possible for speed to remain constant while velocity changes?",
        answer: "Yes, in uniform circular motion.",
    },
    {
        question: "What is the significance of the area under an acceleration-time graph?",
        answer: "It gives change in velocity.",
    },
    {
        question: "What is the graphical method to derive equations of motion?",
        answer: "Using velocity-time graphs and areas under the curves.",
    },
    {
        question: "Which equation of motion is independent of time?",
        answer: "v² = u² + 2as",
    },
    {
        question: "If the velocity of a particle is zero at an instant, is its acceleration necessarily zero?",
        answer: "No. Acceleration could be non-zero, such as at the topmost point of projectile motion.",
    },
    {
        question: "What is the relation between velocity and displacement in uniform acceleration?",
        answer: "v² = u² + 2as; relates final velocity, initial velocity, and displacement.",
    },
    {
        question: "What does a horizontal line on a velocity-time graph represent?",
        answer: "Constant velocity.",
    },
    {
        question: "What is the dimensional formula of acceleration?",
        answer: "[LT⁻²]",
    },
    {
        question: "What is the net displacement if a body moves 4 m north, then 3 m south?",
        answer: "1 m north.",
    },
    {
        question: "How does increasing projection angle affect the range of a projectile?",
        answer: "Range increases till 45°, then decreases.",
    },
    {
        question: "What is the nature of acceleration in vertical projectile motion?",
        answer: "Constant, directed downward.",
    },
    {
        question: "Is range affected by mass in projectile motion?",
        answer: "No, range is independent of mass (in ideal conditions).",
    },
    {
        question: "Two projectiles are thrown at complementary angles. What can be said about their ranges?",
        answer: "They are equal if speeds are equal.",
    },
    {
        question: "Can displacement ever be greater than distance?",
        answer: "No, distance is always greater than or equal to displacement.",
    },
    {
        question: "Why is velocity a vector and speed a scalar?",
        answer: "Velocity has both magnitude and direction, speed has only magnitude.",
    },
    {
        question: "What is the effect of changing projection angle on the maximum height of a projectile?",
        answer: "As angle increases from 0° to 90°, maximum height increases; it is maximum at 90°.",
    },
    {
        question: "In what situation is the range of a projectile zero?",
        answer: "When it is projected vertically upward or downward.",
    },
    {
        question: "A boy throws a stone vertically upward. Which kinematic equation helps find the max height?",
        answer: "v² = u² + 2as, using v = 0 at top.",
    },
    {
        question: "How do you identify non-uniform acceleration from a velocity-time graph?",
        answer: "If the graph is curved (not a straight line), acceleration is non-uniform.",
    },
    {
        question: "Can two different velocity-time graphs give the same displacement?",
        answer: "Yes, if the area under both graphs is equal.",
    },
    {
        question: "How do you represent acceleration graphically on a velocity-time graph?",
        answer: "It is the slope of the velocity-time graph.",
    },
    {
        question: "How does air resistance affect the range and height of a projectile?",
        answer: "Both are reduced due to opposing drag force.",
    },
    {
        question: "What happens to the time of flight if the projection velocity is doubled?",
        answer: "Time of flight becomes twice, since it depends linearly on velocity.",
    },
    {
        question: "What type of motion is represented by a parabolic path?",
        answer: "Projectile motion under gravity.",
    },
    {
        question: "Which component of velocity changes in projectile motion?",
        answer: "Vertical component due to gravity.",
    },
    {
        question: "What are the initial velocity components for a projectile launched at angle θ?",
        answer: "u_x = u cosθ, u_y = u sinθ",
    },
    {
        question: "How is motion in one dimension different from motion in two dimensions?",
        answer: "1D involves motion along a single axis; 2D involves motion in a plane requiring vector analysis.",
    },
    {
        question: "In a displacement-time graph, what does a steeper slope indicate?",
        answer: "Higher velocity.",
    },
    {
        question: "How does acceleration affect velocity?",
        answer: "Acceleration increases or decreases velocity depending on direction.",
    },
    {
        question: "How do you derive range of a projectile using components?",
        answer: "Range R = (u² sin2θ) / g using horizontal velocity × time of flight.",
    },
    {
        question: "Which graph shows uniformly accelerated motion starting from rest?",
        answer: "A straight line with positive slope on a velocity-time graph passing through origin.",
    },
    {
        question: "How does range change if angle of projection is decreased from 60° to 30°?",
        answer: "Range increases (since 30° has a complementary pair closer to 45°).",
    },
    {
        question: "Can velocity and acceleration be in opposite directions?",
        answer: "Yes, during retardation.",
    },
    {
        question: "Why is vector representation crucial in 2D kinematics?",
        answer: "Because direction matters, especially when adding velocities or displacements.",
    },
    {
        question: "What determines the curvature of a projectile's path?",
        answer: "Initial velocity, angle of projection, and gravitational pull.",
    },
    {
        question: "If a body has uniform acceleration, what will its velocity-time graph look like?",
        answer: "A straight line with a constant slope.",
    },
    {
        question: "How is relative velocity calculated when two bodies move in opposite directions?",
        answer: "Add their speeds: V_rel = V1 + V2.",
    },
    {
        question: "In riverboat problems, what does the time of crossing depend on?",
        answer: "Width of the river and the velocity of the boat perpendicular to current.",
    },
    {
        question: "What is the result of vector addition of two perpendicular velocities?",
        answer: "Use Pythagoras: v = √(v1² + v2²).",
    },
    {
        question: "What happens to the net displacement in a round trip?",
        answer: "It becomes zero.",
    },
    {
        question: "What does a negative slope on a displacement-time graph indicate?",
        answer: "The particle is moving in the opposite direction.",
    },
    {
        question: "When is the magnitude of average velocity equal to average speed?",
        answer: "When motion is along a straight path without changing direction.",
    },
    {
        question: "A ball dropped from a height hits the ground in 2 seconds. What is the height?",
        answer: "s = 0.5 × g × t² = 0.5 × 10 × 4 = 20 m.",
    },
    {
        question: "What is the displacement of a particle moving with uniform acceleration in nth second?",
        answer: "s_n = u + a/2 × (2n - 1).",
    },
    {
        question: "What is the graphical representation of retardation?",
        answer: "A velocity-time graph with negative slope.",
    },
    {
        question: "Can acceleration be constant but not zero if speed is zero?",
        answer: "Yes, at the top of projectile motion.",
    },
    {
        question: "What is the effect of doubling the projection speed on projectile range?",
        answer: "Range becomes 4 times since R ∝ u².",
    },
    {
        question: "What is a time-symmetric path in projectile motion?",
        answer: "Ascent and descent take equal time and are symmetric.",
    },
    {
        question: "What is the velocity at the highest point of projectile?",
        answer: "Equal to horizontal component: u cosθ.",
    },
    {
        question: "How can you find range using time of flight and horizontal velocity?",
        answer: "R = u_x × T.",
    },
    {
        question: "Why is distance always positive?",
        answer: "It’s a scalar and measures total path, not direction.",
    },
    {
        question: "How can displacement be negative?",
        answer: "If final position is behind the starting point relative to chosen direction.",
    },
    {
        question: "A particle's velocity is increasing and acceleration is negative. What does it mean?",
        answer: "The particle is slowing down; velocity and acceleration have opposite directions.",
    },
    {
        question: "Which kinematic equation is used when displacement is unknown?",
        answer: "v = u + at.",
    },
    {
        question: "How does initial velocity affect time of flight in vertical projectile?",
        answer: "Time of flight increases linearly with u.",
    },
    {
        question: "What is the direction of acceleration in projectile motion?",
        answer: "Always vertically downward due to gravity.",
    },
    {
        question: "What does the slope of a velocity-time graph represent?",
        answer: "Acceleration.",
    },
    {
        question: "When does a body experience zero net displacement but non-zero total distance?",
        answer: "When it returns to its initial position.",
    },
    {
        question: "How does the projection angle affect the shape of the projectile path?",
        answer: "Greater angle → higher arc, smaller angle → flatter arc.",
    },
    {
        question: "If two projectiles are fired with same speed at angles θ and 90°–θ, what can be said about their ranges?",
        answer: "They will be equal.",
    },
    {
        question: "What is the dimensional formula of velocity?",
        answer: "[LT⁻¹]",
    },
    {
        question: "In river-boat problems, what is the resultant velocity of the boat?",
        answer: "Vector sum of boat’s velocity and river current.",
    },
    {
        question: "What does the area under an acceleration-time graph indicate?",
        answer: "Change in velocity.",
    },
    {
        question: "How is instantaneous acceleration calculated graphically?",
        answer: "It is the slope of the tangent on a velocity-time graph.",
    },
    {
        question: "What are the SI units of displacement, velocity, and acceleration?",
        answer: "Meter (m), meter per second (m/s), meter per second squared (m/s²).",
    },
    {
        question: "Why do projectiles follow a curved path?",
        answer: "Due to simultaneous horizontal motion and downward acceleration.",
    },
    {
        question: "What will the velocity-time graph of a freely falling body from rest look like?",
        answer: "A straight line with positive slope equal to g.",
    },
    {
        question: "What causes a change in direction in projectile motion?",
        answer: "The vertical acceleration due to gravity.",
    },
    {
        question: "If a stone is projected horizontally, what is its vertical initial velocity?",
        answer: "Zero.",
    },
    {
        question: "How does acceleration vary with time in uniform acceleration?",
        answer: "It remains constant.",
    },
    {
        question: "A particle moves in a straight line with changing velocity. What type of motion is it?",
        answer: "Non-uniform rectilinear motion.",
    },
    {
        question: "How do you find net displacement in 2D motion using vectors?",
        answer: "Use the Pythagorean theorem on x and y components.",
    },
    {
        question: "What is the nature of acceleration in free fall near Earth?",
        answer: "It is constant and equal to g (≈ 9.8 m/s² downward).",
    },
    {
        question: "What is the relation between displacement and distance?",
        answer: "Displacement ≤ Distance always.",
    },
    {
        question: "In projectile motion, what is the net velocity at the topmost point?",
        answer: "Equal to the horizontal component of initial velocity.",
    },
];
